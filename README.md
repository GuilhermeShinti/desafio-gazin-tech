# Desefio gazin

### Tecnologias Utilizadas
- backend: docker, bash, node, javascript, jest
- frontend: react, javascript, html, css, bootstrap

## Utilização

Caso esteja em ambiente linux, é necessário executar apenas o script abaixo na raiz do projeto:
```
./local_runner.sh
```

### Execução Manual
Para executar as aplicações manualmente, siga os passos abaixos executando os comandos no terminal na raiz do projeto

1 - para subir os containers
```
docker compose up -d
```
 

2 - depois de ter certeza que o banco está ativo e funcional, execute o comando abaixo para criação do banco de dados
```
npx sequelize-cli db:create
```
3 - executa as migrations
```
npx sequelize-cli db:migrate
```
4 - (opcional) popula as tabelas com alguns dados
```
npx sequelize-cli db:seed:all
```



