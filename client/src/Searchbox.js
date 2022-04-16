import React, { useState } from 'react';
const Searchbox = (props) => {
    const { setSubdomains } = props;
    const [loading, setLoading] = useState(false);

    const getSubdomains = (domain) => {
        return fetch('http://localhost:8000/' + domain);
    };
    
    const enumerateSubdomains = (domain, setSubdomains) => {
        setLoading(true);
    
        getSubdomains(domain)
            .then(response => response.json())
            .then(json => setSubdomains(json))
            .then(() => setLoading(false));
    }

    return (<>
        <form onSubmit={(event) => {
            event.preventDefault();
            enumerateSubdomains(event.target["domain"].value, setSubdomains)
        }}>
            <label>
                Domain:
                <input type="text" name="domain" />
            </label>
            <input type="submit" value="Enumerate" />
        </form>

        {loading && (<p>Loading...</p>) }
    </>);
};

export default Searchbox;