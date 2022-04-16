import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import OrderForm, { OrderFormData } from '@Components/OrderForm'
import { moment } from '@Configs'
import { AdminLayout } from '@Layouts'
import { Book, NextPageWithLayout, Order, OrderDetail, OrderStatusTranslate, User } from '@Model'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Box,
  Button,
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
import { getBooks } from 'apis/book'
import { createOrder, doneOrderDetail, getOrders, updateOrder } from 'apis/order'
import { getUsers } from 'apis/user'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Order
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'user', label: 'Tên người dùng', minWidth: 170, format: (value: User) => value.fullName || '' },
  {
    id: 'user',
    label: 'Số điện thoại',
    minWidth: 170,
    format: (value: User) => value.phone,
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

const OrderAdmin: NextPageWithLayout = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [books, setBooks] = useState<Book[]>([])

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

  const onSubmit = async (data: OrderFormData) => {
    try {
      if (formOption.type === 'ADD') {
        const res = await createOrder(data)

        setOrders((state) => [...state, res.data])
      } else {
        const res = await updateOrder(formOption.order!._id, data)

        setOrders((state) => state.map((item) => (item._id !== formOption.order!._id ? item : res.data)))
      }

      setFormOption((state) => ({ ...state, open: false }))
    } catch (error: any) {
      setNotiOption((state) => ({
        ...state,
        open: true,
        message: error.response?.data?.error?.message || 'Hệ thống đang bảo trì',
      }))
    }
  }

  const onDetailDone = async (detailId: OrderDetail['_id']) => {
    try {
      const res = await doneOrderDetail(formOption.order!._id, detailId)

      setOrders((state) => state.map((item) => (item._id !== formOption.order!._id ? item : res.data)))
      setFormOption((state) => ({ ...state, order: res.data }))
    } catch (error: any) {
      setNotiOption((state) => ({
        ...state,
        open: true,
        message: error.response?.data?.error?.message || 'Hệ thống đang bảo trì',
      }))
    }
  }

  useEffect(() => {
    const getData = async () => {
      const orders = getOrders()
      const users = getUsers()
      const books = getBooks()

      const res = await Promise.all([orders, users, books])

      setOrders(res[0].data)
      setUsers(res[1].data)
      setBooks(res[2].data)
    }

    getData()
  }, [])

  return (
    <Box>
      <Box textAlign="end">
        <Button
          variant="contained"
          sx={{ marginBottom: (theme) => theme.spacing(3) }}
          onClick={() => setFormOption({ open: true, type: 'ADD' })}
        >
          Thêm phiếu mượn
        </Button>
      </Box>

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
                  Thao tác
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
                      <ModeEditIcon
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
        <OrderForm
          type={formOption.type}
          onSubmit={onSubmit}
          order={formOption.order}
          users={users}
          books={books}
          onDetailDone={onDetailDone}
        />
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

OrderAdmin.Layout = AdminLayout

export default OrderAdmin
