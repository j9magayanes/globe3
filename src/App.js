import './App.css';
import GlobeComponent from './components/globe';
import Header from './components/header';
import Bottom from './components/bottom';

function App() {
  return (
    <div className="App">
      <Header />
      <Bottom />

      <GlobeComponent/>
    </div>
  );
}

export default App;
