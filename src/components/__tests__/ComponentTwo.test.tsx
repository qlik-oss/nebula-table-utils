import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import ComponentTwo from '../ComponentTwo';

describe('<ComponentTwo />', () => {
  const renderer = () => render(<ComponentTwo valOne="one" valTwo={false} />);

  test('should render Proper test in dom', () => {
    renderer();
    expect(screen.findByText('Hi there from #2nd test component ---')).toBeInTheDocument;
    expect(screen.getByTestId('state-val').textContent).toBe('10');
  });

  test('clicking button should increase the value by 10', async () => {
    renderer();
    expect(screen.getByTestId('state-val').textContent).toBe('10');

    await userEvents.click(screen.getByRole('button'));
    expect(screen.getByTestId('state-val').textContent).toBe('20');
  });
});
