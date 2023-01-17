import React, { FC } from 'react';
import Logo from '../logo/logo';

type Props = {
  isLogoLight?: boolean;
};

const PageFooter: FC<Props> = ({ isLogoLight }) => (
  <footer className="page-footer">
    <Logo light={isLogoLight}/>

    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default PageFooter;
