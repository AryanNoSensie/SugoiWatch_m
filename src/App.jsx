
import './App.css';
import { Analytics } from "@vercel/analytics/react"

import ErrorBoundary from './components/ErrorBoundary';
import ContentContainer from './components/ContentContainer';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ContentContainer />
      </ErrorBoundary>
      <Analytics />
    </div>
  );
}

export default App;
