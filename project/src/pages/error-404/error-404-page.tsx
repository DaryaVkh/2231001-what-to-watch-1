import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error404Page: FC = () => (
  <>
    <h1>
      404.
      <br/>
      <small>Page not found</small>
    </h1>
    <Link to="/">Go to main page</Link>
  </>
);


export default Error404Page;
