import React from 'react';
import ProgressBar from './ProgressBar.jsx';

export default { title: 'Components/ProgressBar' };

export const Example = () => (
  <div style={{ width: 240 }}>
    <ProgressBar color='#38bdf8' value={72} />
  </div>
);
