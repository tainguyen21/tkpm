import CardForm from '@Components/CardForm'
import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import ModalConfirm from '@Components/common/ModalConfirm'
import { moment } from '@Configs'
import { AdminLayout } from '@Layouts'
import { Card, NextPageWithLayout, User } from '@Model'
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
import { createCard, deleteCard, getCards, updateCard } from 'apis/card'
import { getUsers } from 'apis/user'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Card
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'user', label: 'Tên người dùng', minWidth: 170, format: (value: User) => value.fullName || '' },
  { id: 'user', label: 'Số điện thoại', minWidth: 170, format: (value: User) => value.phone || '' },
  {
    id: 'expiredAt',
    label: 'Ngày hết hạn',
    minWidth: 170,
    format: (value: Date) => moment(value).format('DD/MM/YYYY'),
  },
]

const CardAdmin: NextPageWithLayout = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [users, setUsers] = useState<User[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    card?: Card
  }>({
    open: false,
    type: 'ADD',
  })

  const [confirmOption, setConfirmOption] = useState({
    open: false,
    title: '',
    detail: '',
    type: 'error',
  })

  const [deleteId, setDeleteId] = useState<Card['_id'] | null>(null)

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

  const onSubmit = async (data: Card) => {
    try {
      if (formOption.type === 'ADD') {
        const res = await createCard(data)

        setCards((state) => [...state, res.data])
      } else {
        const res = await updateCard(formOption.card!._id, data)

        setCards((state) => state.map((item) => (item._id !== formOption.card!._id ? item : res.data)))
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

  const onDelete = async () => {
    try {
      if (deleteId) {
        const res = await deleteCard(deleteId)

        setConfirmOption((state) => ({ ...state, open: false }))
        setCards((state) => state.filter((item) => item._id !== res.data._id))
      }
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
      const cards = getCards()
      const users = getUsers()

      const res = await Promise.all([cards, users])

      setCards(res[0].data)
      setUsers(res[1].data)
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
          Thêm thẻ
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
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column, index) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={index + row._id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <ModeEditIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', mr: 3 }}
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', card: row })}
                      />
                      {/* <DeleteIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setConfirmOption({
                            open: true,
                            title: 'Xoá thông tin',
                            detail: 'Dữ liệu sau khi xoá sẽ không thể phục hồi. Bạn có chắc muốn xoá?',
                            type: 'error',
                          })

                          setDeleteId(row._id)
                        }}
                      /> */}
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
          count={cards.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <CardForm type={formOption.type} onSubmit={onSubmit} card={formOption.card} users={users} />
      </Dialog>

      <MessageNoti
        open={notiOption.open}
        message={notiOption.message}
        onClose={() => setNotiOption((state) => ({ ...state, open: false }))}
        type={notiOption.type}
      />

      <ModalConfirm
        open={confirmOption.open}
        onClose={() => {
          setConfirmOption((state) => ({ ...state, open: false }))
          setDeleteId(null)
        }}
        onReject={() => {
          setConfirmOption((state) => ({ ...state, open: false }))
          setDeleteId(null)
        }}
        onConfirm={onDelete}
        title={confirmOption.title}
        detail={confirmOption.detail}
        type={confirmOption.type as any}
      />
    </Box>
  )
}

CardAdmin.Layout = AdminLayout

export default CardAdmin
