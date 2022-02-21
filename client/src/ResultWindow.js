import React from 'react';

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

const Result = (props) => {
    const { domain } = props;
    const [open, setOpen] = React.useState(false);
    return (<>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {domain.name} 
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
                    {subdomains.map(domain => <Result key={domain.id} domain={domain} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </>) : <></>;
}

export default ResultWindow;