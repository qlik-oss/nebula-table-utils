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
      <div style={{ margin: '2rem', padding: '2rem', border: '10px dashed red' }}>
        <h2>OBVIOUS CHANGE OF MY PR #33333</h2>
      </div>
    </div>
  );
};

export default ComponentTwo;
