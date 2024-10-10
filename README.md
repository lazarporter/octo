# Getting Started

This project uses [Vite](https://vitejs.dev/)

```bash
npm install
npm run dev
```

# Testing

This repo uses [Jest](https://jestjs.io/) for unit testing and Cypress for end-to-end testing. The convention is to put each component's unit test file next to the component file.

## Jest unit tests

```bash
npm test

# To rerun tests automatically as you make changes:
npm run test:watch

# To see % test coverage:
npm run test:coverage
```

## Cypress end-to-end tests

```bash
# Run headless
npm run cypress:run

# Run with Cypress app and view the tests in your browser
npm run cypress:open
```

# Code Quality

This repo is configured with husky to run `eslint` and `prettier` as pre-commit hooks.
You can also run them manually with:

```bash
# prettier
npm run format

# eslint
npm run lint
```

# Building for production

```bash
npm run build

# and optionally run a local server to preview:
npm run preview
```

The production build to serve can be found in the `/dist` folder
