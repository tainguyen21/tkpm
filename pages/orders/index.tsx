import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import OrderDetail from '@Components/OrderDetail'
import { moment } from '@Configs'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout, Order, OrderStatusTranslate } from '@Model'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  Box,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { getOrders } from 'apis/order'
import { useAppSelector } from 'hooks'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Order
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => any
}

const Order: NextPageWithLayout = () => {
  const columns: readonly Column[] = [
    {
      id: '_id',
      label: 'STT',
      minWidth: 170,
      format: (value: string) => orders.findIndex((item) => item._id === value) + 1,
    },
    {
      id: 'createdAt',
      label: 'Ngày mượn',
      minWidth: 170,
      format: (value: Date) => moment(value).format('DD/MM/YYYY'),
    },
    {
      id: 'status',
      label: 'Tình trạng',
      minWidth: 170,
      format: (value: string) => OrderStatusTranslate[value],
    },
    {
      id: 'expiredAt',
      label: 'Ngày hết hạn',
      minWidth: 170,
      format: (value: Date) => moment(value).format('DD/MM/YYYY'),
    },
  ]

  const auth = useAppSelector((state) => state.auth)

  const [orders, setOrders] = useState<Order[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    order?: Order
  }>({
    open: false,
    type: 'ADD',
  })

  const [notiOption, setNotiOption] = useState<MessageNotiProps>({ open: false, message: '', type: 'error' })

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClose = () => {
    setFormOption((state) => ({ ...state, open: false }))
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getOrders({ user: auth._id })

      setOrders(res.data)
    }

    if (auth._id) getData()
  }, [auth])

  return (
    <Box maxWidth="1200px" mx="auto" mt={4}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right" style={{ minWidth: 170 }}>
                  Chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column, index) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id + index} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <VisibilityIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', mr: 3 }}
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', order: row })}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <OrderDetail order={formOption.order!} />
      </Dialog>

      <MessageNoti
        open={notiOption.open}
        message={notiOption.message}
        onClose={() => setNotiOption((state) => ({ ...state, open: false }))}
        type={notiOption.type}
      />
    </Box>
  )
}

Order.Layout = MainLayout

export default Order
