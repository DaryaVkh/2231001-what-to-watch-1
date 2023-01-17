import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './scroll-to-top';

describe('Component test: ScrollToTop', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('Should work correctly', () => {
    render(<MemoryRouter><ScrollToTop/></MemoryRouter>);

    expect(window.scrollTo).toBeCalled();
    expect(window.scrollTo).toBeCalledTimes(1);
  });
});
