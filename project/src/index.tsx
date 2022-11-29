import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { PROMO_FILM } from './mocks/films';
import { store } from './store';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilm={PROMO_FILM}/>
    </Provider>
  </React.StrictMode>,
);
