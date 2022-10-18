import {FC} from 'react';
import {Link} from 'react-router-dom';

const Error404Page: FC = () => (
  <section>
    <h1>
      404.
      <br/>
      <br/>
      <small>Page not found</small>
    </h1>
    <Link to="/">Go to main page</Link>
  </section>
);


export default Error404Page;
