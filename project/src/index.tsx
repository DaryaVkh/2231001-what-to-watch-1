import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILM_LIST, PROMO_FILM } from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={FILM_LIST} promoFilm={PROMO_FILM} />
  </React.StrictMode>,
);
