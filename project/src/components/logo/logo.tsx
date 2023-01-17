import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  light?: boolean;
};

const Logo: FC<Props> = ({ light }) => {
  const logoLinkClasses = classNames({
    'logo__link': true,
    'logo__link--light': light
  });

  return (
    <div className="logo">
      <Link to="/" className={logoLinkClasses}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

export default Logo;
