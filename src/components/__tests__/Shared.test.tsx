import React from 'react';
import { render, screen } from '@testing-library/react';
import Shared from '../Shared';

describe('<Shared />', () => {
  const renderer = () => render(<Shared />);

  test('should render `This is shared` text in dom', () => {
    renderer();

    expect(screen.findByText('This is shared')).toBeInTheDocument;
  });
});
