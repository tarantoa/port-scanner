import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Result from './Result';

const ResultWindow = (props) => {
    const { subdomains } = props;

    return subdomains && subdomains.length > 0 ? (<>
        <TableContainer>
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
