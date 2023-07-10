import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentOne from '../ComponentOne';

describe('<ComponentOne />', () => {
  const renderer = () => render(<ComponentOne />);

  test('should render Proper test in dom', () => {
    renderer();
    expect(screen.findByText('Hi there From Component #01, NO STATE')).toBeInTheDocument;
  });
});
