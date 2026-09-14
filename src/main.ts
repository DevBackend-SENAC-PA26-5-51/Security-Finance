import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           
      forbidNonWhitelisted: true, 
      transform: true,           
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Security Finance API')
    .setDescription(
      [
        '## Sistema de Gestão Financeira — Security Finance',
        '',
        'API REST para gestão financeira de clientes, funcionários, faturamento e indicadores.',
        '',
        '### Como autenticar (fluxo para o front-end)',
        '1. `POST /autenticacao/login` com `{ "email", "senha" }` para obter o `access_token` (JWT válido por 1h).',
        '2. Clique em **Authorize 🔓** no topo desta página e informe: `Bearer <access_token>`.',
        '3. Todas as rotas marcadas com 🔒 passam a funcionar. O token carrega `{ sub, email, tipo }` onde `tipo` é `cliente` ou `funcionario`.',
        '',
        '### Módulos',
        '- **Autenticação** (`/autenticacao`): login unificado de clientes e funcionários.',
        '- **Clientes** (`/clientes`): busca pública por e-mail + rota privada de exemplo/validação de token.',
        '- **Funcionários** (`/funcionarios`): listagem, cadastro (com hash bcrypt), busca por e-mail e rota privada.',
        '- **Faturamento** (`/faturamento`): agregado mensal `{ ano, mes, total }` agrupado por `data_faturamento`.',
        '- **Indicadores** (`/indicadores`): KPIs financeiros (`totalPgto`, `totalEstornos`, `saldoAtual`, `qtdTransacao`) e `GET /indicadores/dashboard` com `{ resumo, porMes }` para gráficos.',
        '',
        '### Convenções',
        '- Datas no formato ISO 8601 (`YYYY-MM-DD` ou `YYYY-MM-DDTHH:mm:ss`).',
        '- Valores monetários como `number` (ex: `199.90`).',
        '- Erros seguem o padrão Nest: `{ "message", "error", "statusCode" }`.',
      ].join('\n'),
    )
    .setVersion('1.0.0')
    .addTag('Autenticação', 'Login e emissão de token JWT.')
    .addTag('Clientes', 'Busca de clientes e rota privada de validação.')
    .addTag('Funcionários', 'Cadastro, listagem e busca de funcionários.')
    .addTag(
      'Faturamento',
      'Agregado mensal de faturamento para relatórios e gráficos.',
    )
    .addTag(
      'Indicadores',
      'KPIs financeiros, resumo e movimentação mensal para o dashboard.',
    )
    .addTag('Health Check', 'Verificação de disponibilidade da API.')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description:
          'Informe o token JWT obtido em POST /autenticacao/login. Ex: Bearer eyJhbGciOi...',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer(`http://localhost:${process.env.PORT ?? 5000}`, 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Security Finance API — Docs',
  });

  app.enableCors();

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
