import React from 'react';
export interface IComp2Props {
    valOne: string;
    valTwo: boolean;
}
declare const ComponentTwo: (args: IComp2Props) => React.JSX.Element;
export default ComponentTwo;
