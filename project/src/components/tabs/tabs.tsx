import classNames from 'classnames';
import { FC, useState } from 'react';
import { Tab } from '../../types/tab.enum';
import DetailsTab from './details-tab';
import OverviewTab from './overview-tab';
import ReviewsTab from './reviews-tab';

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Overview);

  const renderTabByType = () => {
    switch (activeTab) {
      case Tab.Details:
        return <DetailsTab/>;
      case Tab.Reviews:
        return <ReviewsTab/>;
      default:
        return <OverviewTab/>;
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
          <li className={getTabClasses(Tab.Overview)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.Overview)}>Overview</span>
          </li>
          <li className={getTabClasses(Tab.Details)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.Details)}>Details</span>
          </li>
          <li className={getTabClasses(Tab.Reviews)}>
            <span className="film-nav__link" onClick={() => setActiveTab(Tab.Reviews)}>Reviews</span>
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
