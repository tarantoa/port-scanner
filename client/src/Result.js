import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';

const Result = (props) => {
    const { domain, uuid } = props;

    const [openPorts, setOpenPorts] = useState([]);
    const [hasScanned, setHasScanned] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [open, setOpen] = useState(false);

    const getOpenPorts = async (name, uuid) => {
        let result = await fetch('http://localhost:8000/' + name + '/ports');
        return result.json();
    };

    useEffect(() => {
        const scan = async () => {
            setLoadingStatus(true);
            const ports = await getOpenPorts(domain, uuid);
            setOpenPorts(ports);
            setLoadingStatus(false);
        };

        if (open && !hasScanned) {
            scan();
            setHasScanned(true);
        }
    }, [domain, hasScanned, uuid, open]);

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
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1}}>
                        {
                            loadingStatus ?
                            "Loading..." :
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Open Ports</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{openPorts.map(port => port.port).join(', ')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>);
};

export default Result;
