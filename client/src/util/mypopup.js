import { Popup } from 'semantic-ui-react';
import React from 'react';

const myPopup = ({content, children}) => {
  return <Popup inverted content={content} trigger={children} />
}

export default myPopup;
