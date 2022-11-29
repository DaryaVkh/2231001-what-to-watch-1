import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../common/models';
import { useAppSelector } from '../../hooks/store-helpers';
import AddReviewPage from '../../pages/add-review/add-review-page';
import Error404Page from '../../pages/error-404/error-404-page';
import FilmPage from '../../pages/film/film-page';
import MainPage from '../../pages/main/main-page';
import MyListPage from '../../pages/my-list/my-list-page';
import PlayerPage from '../../pages/player/player-page';
import SignInPage from '../../pages/sign-in/sign-in-page';
import { Film } from '../../types/film.type';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

type Props = {
  promoFilm: Film;
};

const App: FC<Props> = (props) => {
  const { promoFilm } = props;
  const { films } = useAppSelector((state) => state);

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.MAIN}>
          <Route index element={<MainPage promoFilm={promoFilm} />}/>
          <Route path={AppRoute.SIGN_IN} element={<SignInPage />}/>
          <Route path={AppRoute.MY_LIST} element={<PrivateRoute><MyListPage films={films} /></PrivateRoute>}/>
          <Route path={AppRoute.FILM}>
            <Route index element={<FilmPage />}/>
            <Route path={AppRoute.ADD_REVIEW} element={<AddReviewPage />}/>
          </Route>
          <Route path={AppRoute.PLAYER} element={<PlayerPage film={promoFilm} />}/>
          <Route path={AppRoute.ERROR404} element={<Error404Page />}/>
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
