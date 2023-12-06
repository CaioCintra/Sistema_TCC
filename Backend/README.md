# Backend Sistema_TCC

Clique para voltar para as 
[Informações gerais](../README.md)

## Configuração de ambiente

Garanta que em seu sistema estejam instalados o Node e o npm.

<br/><b>Windows:</b><br/><br/>
Acesse o site oficial do Node.js: [Node](https://nodejs.org/en).<br/>
Baixe o instalador para Windows (extensão .msi).<br/>
Execute o instalador e siga as instruções do assistente.<br/>
Após a instalação, verifique se o Node.js foi instalado corretamente abrindo um prompt de comando (cmd) e executando os seguintes comandos:<br/>

```console
node -v
npm -v
```
Instale o Node.js e o npm com o comando:<br/>

```console
sudo apt-get install nodejs
sudo apt-get install npm
```

<br/><b>Ubuntu (ou outras distribuições baseadas no Debian):</b><br/><br/>
Abra um terminal.
Atualize a lista de pacotes com o comando:

```console
sudo apt-get update
```

Após a instalação, verifique se o Node.js foi instalado corretamente abrindo um prompt de comando (cmd) e executando os seguintes comandos:<br/>

```console
node -v
npm -v
```

<br/><b>Fedora (ou outras distribuições baseadas no Red Hat):</b><br/><br/>
Abra um terminal.<br/>
Use o gerenciador de pacotes dnf para instalar o Node.js e o npm:<br/>

```console
sudo dnf install nodejs
sudo dnf install npm
```
Após a instalação, verifique se o Node.js foi instalado corretamente abrindo um prompt de comando (cmd) e executando os seguintes comandos:<br/>

```console
node -v
npm -v
```

## Instalação

Clone o sistema:<br/>
```console
git clone https://github.com/CaioCintra/Sistema_TCC.git
```
Ou instale diretamente pelo Github em https://github.com/CaioCintra/Sistema_TCC<br/>

Acesse a pasta do arquivo
```console
cd Sistema_TCC/
```

Backend:<br/>
Acesse a pasta Backend<br/>
```console
cd Backend/
```
E execute com o comando a seguir<br/>
```console
npm install
```

Retorne para a pasta raiz para acessar a pasta do frontend:<br/>
```console
cd ..
cd frontend/
```
E execute com o comando a seguir<br/>
```console
npm install
```
## Banco de dados

O banco de dados está em um servidor neon, então não é necessário nenhuma criação de base de dados se quiser usar o sistema na forma original.<br/>

Caso for usar outro banco de dados que não o hospedado no servidor, crie uma database em um banco de dados PostgresSQL e insira o url em DATABASE_URL no arquivo Sistema_TCC\Backend\.env<br/>

Em seguida execute o comando a seguir para incluir as migrations e assim criar as tabelas:<br/>

```console
cd Backend/
npx prisma migrate dev
```

## Execução
Execute cada um destes em abas separadas de console<br/>

Backend:<br/>
Acesse a pasta Backend<br/>
```console
cd Backend/
```
E execute com o comando a seguir<br/>
```console
npm run dev
```

Frontend:<br/>
Acesse a pasta frontend<br/>
```console
cd frontend/
```
E execute com o comando a seguir<br/>
```console
npm run dev
```

Após executado basta acessar o sistema digitando seu URL no navegador (Padrão: localhost:3000)

## Configuração de variáveis de ambiente

Para a execução do sistema, abra o arquivo Sistema_TCC\Backend\.env e altere suas variáveis<br/>

<b>DATABASE_URL:</b><br/>
URL do banco de dados a ser utilizado<br/>

<b>USERMAIL:</b><br/>
Email do sistema, que irá enviar os emails, para usá-lo crie uma senha no google [Siga estes passos para criar uma senha](https://support.google.com/accounts/answer/185833?hl=pt-BR)<br/>

<b>PASSMAIL:</b><br/>
Senha gerada do Google<br/>

<b>EMAILPRATCC:</b><br/>
Email do PRATCC, email que receberá solicitações de alunos<br/>
