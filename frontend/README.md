# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# 📘 Gestante+ Frontend

Este projeto representa a interface do sistema **Gestante+**, voltado para doulas acompanharem gestantes e suas aulas. Desenvolvido em **React** com design responsivo e moderno utilizando **Tailwind CSS**.

---

## 🚀 Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://seurepositorio.com/gestante-plus-frontend.git
   cd gestante-plus-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o projeto:

   ```bash
   npm start
   ```

---

## 🔎 Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e insira as variáveis de ambiente abaixo:

```env
REACT_APP_USE_MOCK=false
REACT_APP_API_URL=http://localhost:8080/v1
```

### Para que serve:

* `REACT_APP_USE_MOCK`: se `true`, o frontend usa dados mockados (útil para testes sem backend).
* `REACT_APP_API_URL`: define a URL base para as requisições reais à API.

Esse comportamento é utilizado nos `services` como:

```js
const useMock = process.env.REACT_APP_USE_MOCK === "true";

if (useMock) {
  return mockData;
} else {
  return await api.get(...);
}
```

---

## 🌐 Estrutura de Rotas (`routes.js`)

```js
export const routes = {
  // Home
  home: "/home",

  // Login
  login: "/",

  // Gestantes
  gestantes: "/gestantes",
  novaGestante: "/gestantes/nova",
  detalheGestante: (id) => `/gestantes/${id}`,

  // Aulas
  aulas: "/aulas",
  novaAula: "/aulas/nova",
  detalheAula: (id) => `/aulas/${id}`,

  // Sobre
  sobre: "/about",
};
```

Utilização com `Link`:

```jsx
<Link to={routes.novaAula}>Nova Aula</Link>
<Link to={routes.detalheGestante(1)}>Ver Gestante</Link>
```

---

## 📦 Estrutura de Pastas

```
frontend/
├── components/       # Componentes reutilizáveis (Avatar, Toast, Form fields...)
├── constants/        # Listas de enums e labels (ex: comorbidades, tipos de aula)
├── hooks/            # Hooks customizados (ex: useGestantes, useAulas)
├── pages/            # Views principais da aplicação (Login, Home, Gestantes, Aulas...)
├── services/         # Funções de comunicação com a API
├── routes.js         # Definição centralizada das rotas
├── App.js            # Componente principal com o roteamento
└── main.js           # Ponto de entrada
```

---

## ✅ Funcionalidades

* Login rápido de doulas (mockado ou real)
* Cadastro e listagem de gestantes
* Cadastro e listagem de aulas
* Detalhamento individual
* Filtros por doula logada
* Formulários com validação

---

## 🧪 Testes e Validação

* EsLint configurado (padrão React)
* Warnings de source maps de `lucide-react` podem ser ignorados

---

## 💠 Tecnologias

* [React](https://reactjs.org)
* [React Router DOM](https://reactrouter.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide React](https://lucide.dev/)
* [Axios](https://axios-http.com/)

---
