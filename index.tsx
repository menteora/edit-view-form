
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './demo/App';
import './index.css'; // Assuming Tailwind directives might be here, or provided via CDN in HTML

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
