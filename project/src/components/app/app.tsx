import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../common/enums';
import { useAppDispatch } from '../../hooks';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import Error404Page from '../../pages/error-404-page/error-404-page';
import FilmPage from '../../pages/film-page/film-page';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import { checkAuthAction } from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage/>}/>
          <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute><MyListPage/></PrivateRoute>}/>
          <Route path={AppRoute.Film}>
            <Route index element={<FilmPage/>}/>
            <Route path={AppRoute.AddReview} element={<AddReviewPage/>}/>
          </Route>
          <Route path={AppRoute.Player} element={<PlayerPage/>}/>
          <Route path={AppRoute.Error404} element={<Error404Page/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
