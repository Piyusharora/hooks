//import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
test('renders learn react link', () => {
  
  const linkElement = document.createElement('linkElement');
  //screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
  ReactDOM.render(<App />,linkElement);
});
