import React, { useState } from 'react';
import { Shared } from './Shared';

const ComponentTwo = () => {
  const [state, setState] = useState(10);
  const handleClick = () => setState(state + 10);
  return (
    <div>
      <h2>Comp #02 with change 22</h2>
      Component #02 --- <button onClick={handleClick}>STATE:</button> {state}
      <hr />
      <Shared />
    </div>
  );
};

export default ComponentTwo;
