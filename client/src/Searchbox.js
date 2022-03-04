import React from 'react';

const getSubdomains = (domain) => {
    return fetch('http://localhost:8000/' + domain);
};

const enumerateSubdomains = (domain, setSubdomains) => {
    getSubdomains(domain)
        .then(response => response.json())
        .then(json => {console.log(json); return setSubdomains(json)});
}

const Searchbox = (props) => {
    const { setSubdomains } = props;
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
    </>);
};


export default Searchbox;