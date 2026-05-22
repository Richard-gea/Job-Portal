import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

test('renders the login page for logged out users', () => {
  localStorage.removeItem('user');
  window.history.pushState({}, '', '/login');

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/jobquest - login/i)).toBeInTheDocument();
});
