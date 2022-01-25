# Back-end Challenge 🏅 2021 - Space Flight News

## Introdução
>  This is a challenge by [Coodesh](https://coodesh.com/)

**Este é um desafio de Backend com Nodejs para a plataforma Coodesh.**

### Vídeo com apresentação do desafio técnico:
Acesse: [Apresentação Desafio Coodesh Back-end Challenge](https://youtu.be/DRbWKogxCYc);

### Como rodar a aplicação:
Instale as dependências <br>
`npm install` <br>

Crie arquivo **.env** na raiz do projeto e preencha as variáveis de ambiente **PORT**(Porta que rodará a aplicação) e **MONGO_URI**(URI do seu banco MongoDB) <br><br>

Para fazer seed no seu banco de dados execute o comando <br>
`npm run seed`

Para rodar o projeto execute o comando <br>
`npm run start:dev`

Para rodar os testes execute o comando abaixo(Os testes de banco de dados rodam em memória e não afetarão seu banco de dados físico) <br>
`npm run test`

Para padronizar o código do projeto, execute o comando<br>
`npm run lint:fix`


### Tecnologias e metodologias utilizadas:

- Nodejs com Typescript e Express.js;
- Mongoose com testes de banco de dados em memória;
- Arquitetura Limpa, Design Patterns, SOLID, TDD com testes unitários e de integração;
- Testes com Jest, Jest-Mock-Extended e Supertest;
- Formatação de código com Eslint e verificação de código com Husky;
- Configuração de variáveis de ambiente com Dotenv;
- Script para seed de banco de dados;
- Atualização de banco de dados com novos artigos todo dia através de CRON;

### Apresentação do desafio de Backend:
Nesse desafio você deverá desenvolver uma REST API que utilizará os dados do projeto [Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation), uma API pública com informações relacionadas a voos espaciais. O projeto a ser desenvolvido por você tem como objetivo criar a API permitindo assim a conexão de outras aplicações.

[SPOILER] As instruções de entrega e apresentação do challenge estão no final deste Readme (=

### Instruções iniciais obrigatórias

- Trabalhar em um repositório em seu usuário ou utilizar o seu github pessoal (não esqueça de colocar no readme a referência a este challenge);
- O projeto deverá ser desenvolvido com uma das tecnologias a seguir: **Node.js | C# .NET Core | PHP Laravel | RubyOnRails | Go Lang | Python FastAPI | SpringBoot Kotlin | Rust**;
- Criar um banco de dados grátis **MongoDB** usando Atlas: https://www.mongodb.com/cloud/atlas ou banco de dados grátis **MySQL** no Heroku: https://elements.heroku.com/addons/jawsdb ou banco de dados grátis **Postgres** no Heroku: https://elements.heroku.com/addons/heroku-postgresql; (Recomendável usar Drivers oficiais para integração com o DB)

### Modelo de Dados:

Para a definição do modelo consulte a rota [GET]/articles da API, nesta rota você pode ver a estrutura como o exemplo:

```json
{
    "id": 0,
    "featured": false,
    "title": "string",
    "url": "string",
    "imageUrl": "string",
    "newsSite": "string",
    "summary": "string",
    "publishedAt": "string",
    "launches": [
      {
        "id": "string",
        "provider": "string"
      }
    ],
    "events": [
      {
        "id": "string",
        "provider": "string"
      }
    ]
  }
```

### Back-End:

Nessa etapa você deverá construir uma API Restful com as melhores práticas de desenvolvimento, baseada na API [Space Flight News](https://api.spaceflightnewsapi.net/v3/documentation). Para isso você deve executar os passos a seguir:

**Obrigatório 1** - Você deverá desenvolver as seguintes rotas:
**Obs: Foi adicionado a cada rota o prefixo:** `/api/v1/`
- `[GET]/api/v1/: ` Retornar um Status: 200 e uma Mensagem "Back-end Challenge 2021 🏅 - Space Flight News"
- `[GET]/api/v1/articles/:`   Listar todos os artigos da base de dados, utilizar o sistema de paginação para não sobrecarregar a REQUEST
- `[GET]/api/v1/articles/{id}:` Obter a informação somente de um artigo
- `[POST]/api/v1/articles/:` Adicionar um novo artigo
- `[PUT]/api/v1/articles/{id}:` Atualizar um artigo baseado no `id`
- `[DELETE]/api/v1/articles/{id}:` Remover um artigo baseado no `id`

**Obrigatório 2** - Para alimentar o seu banco de dados você deve criar um script para armazenar os dados de todos os artigos na Space Flight News API.

**Obrigatório 3** - Além disso você precisa desenvolver um CRON para ser executado diariamente às 9h e armazenar em seu os novos artigos ao seu banco de dados. (Para essa tarefa você poderá alterar o seu modelo de dados)

**Diferencial 1** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 2** Configurar um sistema de alerta se houver algum falha durante a sincronização dos artigos;

**Diferencial 3** Descrever a documentação da API utilizando o conceito de Open API 3.0;

**Diferencial 4** Escrever Unit Tests para os endpoints da API;

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:

>  This is a challenge by [Coodesh](https://coodesh.com/)

## Finalização e Instruções para a Apresentação

Avisar sobre a finalização e enviar para correção.

1. Confira se você respondeu o Scorecard da Vaga que chegou no seu email;
2. Confira se você respondeu o Mapeamento Comportamental que chegou no seu email;
3. Acesse: [https://coodesh.com/challenges/review](https://coodesh.com/challenges/review);
4. Adicione o repositório com a sua solução;
5. Grave um vídeo, com no máximo 5 minutos, com a apresentação do seu projeto. Foque em pontos obrigatórios e diferenciais quando for apresentar.
6. Adicione o link da apresentação do seu projeto no README.md.
7. Verifique se o Readme está bom e faça o commit final em seu repositório;
8. Confira a vaga desejada;
9. Envie e aguarde as instruções para seguir no processo. Sucesso e boa sorte. =)

## Suporte

Use o nosso canal no slack: http://bit.ly/32CuOMy para tirar dúvidas sobre o processo ou envie um e-mail para contato@coodesh.com.
