import classNames from 'classnames';
import { FC, useState } from 'react';
import { Film } from '../../types/film.type';
import { Tab } from '../../types/tab.enum';
import DetailsTab from './details-tab';
import OverviewTab from './overview-tab';
import ReviewsTab from './reviews-tab';

type Props = {
  film: Film;
};

const Tabs: FC<Props> = (props) => {
  const { film } = props;
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);

  const renderTabByType = () => {
    switch (activeTab) {
      case Tab.DETAILS:
        return <DetailsTab film={film} />;
      case Tab.REVIEWS:
        return <ReviewsTab filmId={film.id} />;
      default:
        return <OverviewTab film={film} />;
    }
  };

  const getTabClasses = (tab: Tab) => classNames({
    'film-nav__item': true,
    'film-nav__item--active': activeTab === tab
  });

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={getTabClasses(Tab.OVERVIEW)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.OVERVIEW)}>Overview</span>
          </li>
          <li className={getTabClasses(Tab.DETAILS)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.DETAILS)}>Details</span>
          </li>
          <li className={getTabClasses(Tab.REVIEWS)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.REVIEWS)}>Reviews</span>
          </li>
        </ul>
      </nav>

      {
        renderTabByType()
      }
    </div>
  );
};

export default Tabs;
