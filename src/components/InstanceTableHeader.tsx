import { MouseEvent } from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortlabel from '@mui/material/TableSortLabel'
import { Order } from '../utils/sort'

type HeadCell = {
  id: string
  label: string
}

const headCells: HeadCell[] = [
  { id: 'name', label: 'Name' },
  { id: 'id', label: 'Id' },
  { id: 'size', label: 'Type' },
  { id: 'state', label: 'State' },
  { id: 'az', label: 'Zone' },
  { id: 'publicIp', label: 'Public IP' },
  { id: 'privateIp', label: 'Private IP' }
]

type Props = {
  order: Order
  orderBy: string
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void
}

function TableHeader({ order, orderBy, onRequestSort }: Props): JSX.Element {
  function createSortHandler(property: string): (e: MouseEvent<unknown>) => void {
    return (e: MouseEvent<unknown>) => {
      onRequestSort(e, property)
    }
  }

  return (
    <TableHead>
      <TableRow>
        { headCells.map((headCell) => (
          <TableCell key={headCell.id} sx={{ cursor: 'pointer' }}>
            <TableSortlabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortlabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
