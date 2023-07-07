import React, { useState } from 'react';
import { Shared } from './Shared';

const ComponentTwo = () => {
  const [state, setState] = useState(10);
  const handleClick = () => setState(state + 10);
  return (
    <div>
      <h2>Com #2 22234!!!!!!! with litt change</h2>
      Hi there from #2nd test component --- <button onClick={handleClick}>STATE:</button> {state}
      <hr />
      <Shared />
    </div>
  );
};

export default ComponentTwo;
