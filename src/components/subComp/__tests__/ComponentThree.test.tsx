import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentThree from '../ComponentThree';

describe('<ComponentThree />', () => {
  const renderer = () => render(<ComponentThree />);

  test('should render Proper test in dom', () => {
    renderer();
    expect(screen.findByText('Hi there From Component #03')).toBeInTheDocument;
  });
});
