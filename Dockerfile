# =============================================================================
# Security-Finance — NestJS + Prisma 7 + MariaDB
# -----------------------------------------------------------------------------
# Versões consolidadas (pinadas) — não usar tags flutuantes como `latest`:
#   - node:22-alpine        (LTS; exigido por Nest 11 / Prisma 7 / @types/node 24)
#   - mariadb:11.4          (LTS; ver docker-compose.yml — mesma tag nos 2 lug.)
#   - Dependências JS       (pinadas via package-lock.json — build usa `npm ci`)
#   - Prisma / engines      7.9.1 (ver allowScripts no package.json)
#
# devDependencies NECESSÁRIAS em produção (movidas p/ dependencies):
#   - prisma  -> roda `prisma migrate deploy` / `prisma generate` no container
#   - dotenv  -> `prisma.config.ts` e `src/lib/prisma.ts` fazem `import dotenv`
# O restante de devDependencies (jest, eslint, @types/*, ts-node etc.) fica
# SÓ no stage `builder` e é removido com `npm prune --omit=dev`.
# =============================================================================

FROM node:22-alpine AS builder

# bcrypt (nativo) precisa compilar no Alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma.config.ts nest-cli.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate
RUN npm run build
# Remove devDeps p/ a imagem final já sair enxuta (mantém prisma+dotenv,
# que agora são dependencies)
RUN npm prune --omit=dev

# =============================================================================
FROM node:22-alpine AS production

# openssl: exigido pelo Prisma; wget: usado no HEALTHCHECK da API
RUN apk add --no-cache openssl wget

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

RUN chown -R node:node /app
USER node

EXPOSE 5000

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-5000}/ || exit 1

CMD ["node", "dist/main.js"]
