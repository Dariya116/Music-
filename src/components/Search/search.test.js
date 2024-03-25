import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '../../redux/slices/store';
import Search from './Search';
import { Provider } from 'react-redux';
test('renders search form with text,role', () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );

  const searchInputElement = screen.getByPlaceholderText('Поиск');
  expect(searchInputElement).toBeInTheDocument();

  const searchTypeElement = screen.getByRole('search');
  expect(searchTypeElement).toBeInTheDocument();

});
