import { useState } from 'react'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell/TableCell'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import CircularProgress from '@mui/material/CircularProgress'
import TableHeader from './InstanceTableHeader'
import InstanceStateIcon from './InstanceStateIcon'
import { EC2Instance } from '../services/instancesService'
import { Order, getComparator } from '../utils/sort'

type Props = {
  instances: EC2Instance[],
  loading: boolean,
  error: string
}

function InstancesTable({ instances, loading, error }: Props): JSX.Element {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('state');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function getStateColor(state: string): string {
    switch (state) {
      case 'Running':
        return 'success.light'
      case 'Stopping':
        return 'warning.main'
      case 'Stopped':
        return 'error.main'
      case 'Pending':
      default:
        return 'text.secondary'
    }
  }

  function handleRequestSort(e: React.MouseEvent<unknown>, property: string) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function sortedInstances(instances: EC2Instance[]): EC2Instance[] {
    return instances.sort(getComparator(order, orderBy))
  }

  function handlePageChange(e: unknown, newPage: number) {
    setPage(newPage)
  }

  function handleRowsPerPageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      { loading
          ? <Box sx={{ display: 'flex', flexDirection: 'column', mt: 8 }}>
              <CircularProgress sx={{ alignSelf: 'center', mb: 2 }} />
              <Typography>Loading instances</Typography>
            </Box>
          : error
                ? <Typography sx={{ color: 'error.main' }}>{error}</Typography>
                : <Paper sx={{ width: '100%'}}>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} size="small">
                        <TableHeader
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                          { instances.length === 0
                            ? <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', color: 'text.secondary', fontSize: 'medium' }}>
                                  No instances found.
                                </TableCell>
                              </TableRow>
                            : sortedInstances(instances)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((instance) => (
                                <TableRow key={instance.id}>
                                  <TableCell>{instance.name}</TableCell>
                                  <TableCell>{instance.id}</TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Typography sx={{ fontWeight: 'bold', pr: 1, minWidth: 20, color: 'text.secondary' }}>
                                        { instance.size }
                                        </Typography>
                                      <Typography>
                                        {instance.type}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: getStateColor(instance.state) }}>
                                      <InstanceStateIcon state={instance.state} />
                                      <Typography sx={{ ml: 1 }}>
                                        {instance.state}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>{instance.az}</TableCell>
                                  <TableCell>{instance.publicIp}</TableCell>
                                  <TableCell>{instance.privateIp}</TableCell>
                                </TableRow>
                              ))
                            }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      count={instances.length}
                      rowsPerPageOptions={[10, 20, 50, 100]}
                      component="div"
                      page={page}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                    />
                  </Paper>
      }
    </Box>
  )
}

export default InstancesTable
