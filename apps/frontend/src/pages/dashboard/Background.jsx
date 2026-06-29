import React from 'react';

export default function Background() {
  return (
    <div
      className='db-pulse pointer-events-none fixed inset-0 z-0'
      style={{
        background:
          'radial-gradient(ellipse 900px 500px at 0% 0%,rgba(0,166,255,.07) 0%,transparent 65%),radial-gradient(ellipse 700px 400px at 100% 100%,rgba(125,0,255,.06) 0%,transparent 65%)'
      }}
    />
  );
}
