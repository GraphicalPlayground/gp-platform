import React from 'react';
import Icon from './Icons.jsx';

export default {
  title: 'Components/Icons',
  parameters: { layout: 'padded' }
};

export const All = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36 }}>{Icon.home}</div>
      <div style={{ fontSize: 12 }}>Home</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36 }}>{Icon.grid}</div>
      <div style={{ fontSize: 12 }}>Grid</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36 }}>{Icon.play}</div>
      <div style={{ fontSize: 12 }}>Play</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 36, height: 36 }}>{Icon.flame}</div>
      <div style={{ fontSize: 12 }}>Flame</div>
    </div>
  </div>
);
