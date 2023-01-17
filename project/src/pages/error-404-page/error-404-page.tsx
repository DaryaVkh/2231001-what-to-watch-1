import { FC } from 'react';
import { Link } from 'react-router-dom';

const Error404Page: FC = () => (
  <section>
    <h1>404.</h1>
    <h2>Page not found</h2>
    <Link to="/">Go to main page</Link>
  </section>
);

export default Error404Page;
