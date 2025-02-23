
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ContentContainer from './components/ContentContainer';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ContentContainer />
      </ErrorBoundary>
    </div>
  );
}

export default App;