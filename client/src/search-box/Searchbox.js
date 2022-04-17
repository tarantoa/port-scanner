import './Searchbox.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react';

const Searchbox = (props) => {
  const { setSubdomains } = props;

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    enumerateSubdomains(searchText, setSubdomains)
  }

  const handleChange = (event) => {
    setSearchText(event.target.value);
  }

  const enumerateSubdomains = (domain, setSubdomains) => {
    setLoading(true);

    if (searchText) {
      getSubdomains(domain)
        .then(response => response.json())
        .then(json => setSubdomains(json))
        .then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }

  const getSubdomains = (domain) => {
    return fetch('http://localhost:8000/' + domain);
  };

  return (<>
    <Grid container
      spacing={1}
      component="form"
      className="search-container"
      onSubmit={handleSubmit}>
      <Grid item xs={11} md={6}>
        <TextField id="domain"
          onChange={handleChange}
          label="Domain"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">http(s)://</InputAdornment>,
            endAdornment: <SearchIcon sx={{cursor: "pointer"}} onClick={handleSubmit}/>
          }} />
      </Grid>
    </Grid>

    {loading && (<p>Loading...</p>)}
  </>);
};

export default Searchbox;