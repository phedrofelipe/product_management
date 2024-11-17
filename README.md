# Product Management (Gerenciamento de Produtos)

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
</div>

> API desenvolvida para o gerenciamento de produtos e categorias em um banco de dados MongoDB. Utiliza Node.js e Express.js para a definição de rotas e JWT para geração e validação de tokens de autenticação.

## 💻 Pré-requisitos

### Verifique se você atende aos seguintes requisitos:

1. **Node.js**: Verifique se você tem a versão mais recente instalada em sua máquina.
2. **Ferramenta de teste de API:** Instale um software como <a href="https://www.postman.com/downloads/" target="_blank"> Postman </a> ou <a href="https://insomnia.rest/download" target="_blank"> Insomnia </a>.
3. **MongoDB Atlas:** O banco de dados está hospedado no Atlas com acesso restrito por IPs. Os IPs permitidos são:
   - 186.249.18.37/32

### Verificando seu IP:
- Acesse o site <a href="https://meuip.com.br/" target="_blank"> Meu IP </a> e valide qual o IP Público da sua conexão de rede atual.
- Caso seu IP não esteja na lista permitida acima, você pode configurar um banco MongoDB local seguindo [este guia](#-configurando-um-banco-mongodb-local).


## 🚀 Baixando product_management

### Clonando o repositório

Caso tenha o git bash instalado em sua máquina, execute um clone do repositório para o diretório de sua escolha:

```
git clone https://github.com/phedrofelipe/product_management.git
```

### Alternativa: Baixar como .zip

- Caso não tenha o git bash, é possível baixar o repositório como .zip.
- Acesse o repositório no GitHub, baixe o código como .zip e extraia para o diretório de sua escolha.


## ☕ Instalando as dependências

O product_management tem três dependências básicas: express.js, mongoose e jsonwebtoken.

### Para instalar os pacotes referente a cada dependência, navegue até o diretório "server" por meio do terminal CLI do seu sistema Operacional:

```
cd .\product_management\server\
```

### Instale os pacotes das dependências com o NPM (Node package manager):

```
npm install express mongoose jsonwebtoken
```

## ▶️ Executando a aplicação

### Para iniciar o servidor, execute o arquivo `server.js` com o node:

```
node server.js
```

### Se o servidor for iniciado com sucesso, você verá as mensagens:

```
Conexão com o MongoDB estabelecida com sucesso!
Aplicação sendo executada na porta 3000
```

## 🔧 Configurando um banco MongoDB local

Caso prefira usar um banco local:

1. Instale o MongoDB em sua máquina seguindo o <a href="https://www.mongodb.com/pt-br/docs/manual/installation/" target="_blank"> guia oficial de instalação </a>.
2. Após a instalação, inicie o serviço MongoDB.
3. Em seguida, atualiza o "mongoose.connect" no arquivo:
```
\product_management\server\db\connection.js
```
5. Inclua a conexão no código para apontar para o banco local:
```
mongoose.connect("mongodb://localhost:27017/prodManageDB");
```
4. Reinicie o servidor para aplicar as alterações.
