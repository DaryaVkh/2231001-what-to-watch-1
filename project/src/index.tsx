import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { FILM_LIST, PROMO_FILM } from './mocks/films';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App films={FILM_LIST} promoFilm={PROMO_FILM}/>
    </Provider>
  </React.StrictMode>,
);
