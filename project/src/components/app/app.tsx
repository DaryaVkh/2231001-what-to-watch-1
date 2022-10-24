import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main/main-page';
import { Film } from '../../types/film.type';
import SignInPage from '../../pages/sign-in/sign-in-page';
import { AppRoute, AuthorizationStatus } from '../../common/models';
import PrivateRoute from '../private-route/private-route';
import MyListPage from '../../pages/my-list/my-list-page';
import FilmPage from '../../pages/film/film-page';
import AddReviewPage from '../../pages/add-review/add-review-page';
import PlayerPage from '../../pages/player/player-page';
import Error404Page from '../../pages/error-404/error-404-page';

type Props = {
  promoFilm: Film;
  films: Film[];
};

const App: FC<Props> = (props) => {
  const { promoFilm, films } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage promoFilm={promoFilm} films={films}/>}/>
          <Route path={AppRoute.SignIn} element={<SignInPage />}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><MyListPage films={films} /></PrivateRoute>}/>
          <Route path={AppRoute.Film}>
            <Route index element={<FilmPage films={films} />}/>
            <Route path={AppRoute.AddReview} element={<AddReviewPage />}/>
          </Route>
          <Route path={AppRoute.Player} element={<PlayerPage film={promoFilm} />}/>
          <Route path={AppRoute.Error404} element={<Error404Page />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
