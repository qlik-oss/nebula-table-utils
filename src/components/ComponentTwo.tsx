import React, { useState } from 'react';
import Shared from './Shared';

export interface IComp2Props {
  valOne: string;
  valTwo: boolean;
}

const ComponentTwo = (args: IComp2Props) => {
  const [state, setState] = useState(10);
  const handleClick = () => setState(state + 10);
  return (
    <div>
      Hi there from #2nd test component ---
      <button onClick={handleClick} type="button">
        add:
      </button>
      <span data-testid="state-val">{state}</span>
      <hr />
      <Shared />
      <h1>Added just to trigger ci #7</h1>
    </div>
  );
};

export default ComponentTwo;
