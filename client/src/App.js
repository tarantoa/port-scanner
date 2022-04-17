import './App.css';
import Box from '@mui/material/Box';

import { useState } from 'react';

import Searchbox from './search-box/Searchbox.js';
import ResultWindow from './ResultWindow.js';


function App() {
  const [subdomains, setSubdomains] = useState([]);
  return (
    <div className="App">
      <Searchbox setSubdomains={setSubdomains} />
      <Box mt={3}>
        <ResultWindow subdomains={subdomains} />
      </Box>
    </div>
  );
}

export default App;
