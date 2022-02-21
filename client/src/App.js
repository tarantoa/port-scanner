import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

import Searchbox from './Searchbox.js';
import ResultWindow from './ResultWindow.js';


function App() {
  const [subdomains, setSubdomains] = useState([]);
  return (
    <div className="App">
      <Searchbox setSubdomains={setSubdomains} />
      <ResultWindow subdomains={subdomains} />
    </div>
  );
}

export default App;
