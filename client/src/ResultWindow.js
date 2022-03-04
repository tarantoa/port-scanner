import React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const getResultPorts = async (name, uuid) => {
    let result = await fetch('http://localhost:8000/' + name + '/ports');
    let content = result.json();
    return content;
};


const Result = (props) => {
    const { domain, uuid } = props;

    const [open, setOpen] = React.useState(false);
    const [cache, setCache] = React.useState([]);
    React.useEffect(() => {
        const load = async () => {
            const ports = await getResultPorts(domain, uuid);
            setCache(ports);
        };
        load();
    }, [domain, uuid]);

    return (<>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {domain}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Open Ports</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cache.map(port => <TableRow key={port.port}>{port.port}</TableRow>)}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>);
};

const ResultWindow = (props) => {
    const { subdomains } = props;

    return subdomains && subdomains.length > 0 ? (<>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            Domain
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subdomains.map(domain => <Result key={domain.uuid} domain={domain.name} uuid={domain.uuid} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </>) : <></>;
}

export default ResultWindow;