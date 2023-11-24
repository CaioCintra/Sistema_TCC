# Backend Sistema_TCC

## Tecnologias:
O backend deste projeto foi desenvolvido com as seguintes tecnologias:

- [Node.Js](https://nodejs.org/en/about)
- [Prisma](https://www.prisma.io)
- [Neon](https://neon.tech)
- [zod](https://zod.dev)
- [Fastify](https://fastify.dev)

## Instalação

Acesse a pasta Backend execute o seguinte comando para instalar:
```console
npm install
```

## Execução

Para executar o backend, acesse a pasta Backend e use o comando a seguir:
```console
npm run dev
```

O banco de dados está em um servidor neon, então não é necessário nenhuma criação de base de dados se quiser usar o sistema na forma original.

## Variáveis de ambiente

Em /Backend/.env existem variáveis usadas para o funcionamento do ambiente do servidor.

A primeira delas é a **DATABASE_URL**, a url da base de dados, se for utilizar outra base, é necessário alterar este link pelo da base que deseja utilizar.

Para o envio de email também é necessário trocar variáveis no .env o **USERMAIL** deve ser substituído pelo email que irá enviar emails no sistema. 

O **PASSMAIL** é uma senha gerada pelo provedor de email, no caso do Gmail siga estes [passos](https://support.google.com/accounts/answer/185833?hl=pt-BR) para saber como gerar uma.

Por fim, **EMAILPRATCC** é a variável que deve contér como valor o email do PRATCC, com essa informação ele poderá receber emails de quem está requisitando novos professores para o sistema.
