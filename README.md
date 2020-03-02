# Exemplo do meu código utilizando REACT && REDUX && JSON SERVER

Uma aplicação simples de Carrinho para ecommerce, contendo página de lista de produto, produto individual e pré-checkout utilizando React and Redux para um UX adequado e atualizações visuais instantâneas.


## Features
* Adiciona e subtrai itens no carrinho
* Remove os itens
* Edição em tempo real
* Calcula o total dos preços dos itens no carrinho

# Iniciando
### Requerimentos

* Node.js
* NPM

### Instalar a aplicação
```bash
npm install
```
### Iniciar a aplicação
Pra executar, primeiro precisamos rodar o JSON SERVER
json-server --watch rest-api/products.json

Ele ocupara a porta 3000 o que fará nosso carrinho rodar na primeira porta disponível acima desta

```bash
npm start
```
VocÊ será alertado de que a porta 3000 já esta ocupada. Responda que sim para executar o carrinho em outra porta.
O carrinho será aberto automaticamento no seu browser em http://localhost:3001 ou na primeira porta disponível acima desta
