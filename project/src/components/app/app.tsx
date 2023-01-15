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
import { getFilms } from '../../store/app/app-selectors';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

const App: FC = () => {
  const films = useAppSelector(getFilms);

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />}/>
          <Route path={AppRoute.SignIn} element={<SignInPage />}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute><MyListPage/></PrivateRoute>}/>
          <Route path={AppRoute.Film}>
            <Route index element={<FilmPage />}/>
            <Route path={AppRoute.AddReview} element={<AddReviewPage />}/>
          </Route>
          <Route path={AppRoute.Player} element={<PlayerPage />}/>
          <Route path={AppRoute.Error404} element={<Error404Page />}/>
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
