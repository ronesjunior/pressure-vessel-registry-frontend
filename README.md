# [Pressure Vessel Registry]

Projeto front-end desenvolvido com **React** e **Vite**, com integração a uma **API de terceiros** usando `fetch()`.  
A aplicação possui rotas, carregamento dinâmico de dados, popup de cadastro, preloader, tratamento de erros e renderização responsiva dos elementos.

## Descrição

Este projeto foi criado como parte do **Sprint 19 — Projeto Final**.  
O objetivo é construir uma aplicação front-end moderna com React, organizada por componentes, com consumo de API externa e interface responsiva.

A aplicação permite:

- visualizar dados vindos de uma API;
- cadastrar novos itens por meio de popup/modal;
- exibir carregamento com preloader;
- mostrar mensagem de erro em caso de falha na requisição;
- exibir mensagem de “Nada encontrado” quando não houver resultados;
- renderizar os elementos em grupos de três;
- carregar mais elementos com o botão **Mostrar mais**;
- manter organização com rotas e componentes reutilizáveis.

## Tecnologias utilizadas

- **React**
- **Vite**
- **JavaScript**
- **JSX**
- **CSS**
- **React Router DOM**
- **Fetch API**
- **Local Storage**
- **Banco e backend no Google Cloud**
- **frontend no Vercel**

## Estrutura do projeto

```bash
src/
  components/
    App/
    Header/
    Navigation/
    Main/
    About/
    Footer/
    Preloader/
    ModalWithForm/
    NotFound/
    Jobs/
  utils/
    jobsApi.js
  assets/
    fonts/
    images/
  vendor/
```
