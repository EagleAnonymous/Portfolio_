import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // Standardized path resolution

console.log("Frontend initialized at entrypoint: main.jsx");

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
  <StrictMode>
    <App />
  </StrictMode>);
}
