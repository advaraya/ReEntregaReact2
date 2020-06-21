/* NPM modules */
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
/* Own modules */
import { Provider } from 'react-redux';
import App from './components/App/App';
/* Material UI */
/* Assets */
/* CSS */
import './index.css';

import { configureStore } from './store';
import LocalStorage from './utils/Storage';

// Leo del localStorage si hay datos de usuario...
const userSession = LocalStorage.readLocalStorage() || undefined;

//Creo el store
const store = configureStore(userSession);
store.subscribe(() => console.log(store.getState()));

//store.subscribe(() => {
// Forzar el modo producción
const app = (
  <SnackbarProvider maxSnack={2}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);

ReactDOM.render(app, document.getElementById('root'));
//});
