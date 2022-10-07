import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoGraph from './demoGraph';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div>
      <DemoGraph />
    </div>
  </React.StrictMode>,
);
