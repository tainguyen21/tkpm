import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import ModalConfirm from '@Components/common/ModalConfirm'
import UserForm from '@Components/UserForm'
import { AdminLayout } from '@Layouts'
import { NextPageWithLayout, User } from '@Model'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
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
import { deleteUser, getUsers, updateUser } from 'apis/user'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof User
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => any
}

const columns: readonly Column[] = [
  { id: 'fullName', label: 'Tên', minWidth: 170 },
  {
    id: 'phone',
    label: 'Số điện thoại',
    minWidth: 170,
  },
  {
    id: 'isAdmin',
    label: 'Quản trị viên',
    minWidth: 170,
    format: (value: Boolean) => (value ? <DoneIcon /> : ''),
  },
  {
    id: 'isBlacklist',
    label: 'Danh sách đen',
    minWidth: 170,
    format: (value: Boolean) => (value ? <DoneIcon /> : ''),
  },
]

const UserAdmin: NextPageWithLayout = () => {
  const [users, setUsers] = useState<User[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    user?: User
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

  const [deleteId, setDeleteId] = useState<User['_id'] | null>(null)

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

  const onSubmit = async (data: User) => {
    try {
      if (formOption.type === 'ADD') {
      } else {
        const res = await updateUser(formOption.user!._id, data)

        setUsers((state) => state.map((item) => (item._id !== formOption.user!._id ? item : res.data)))
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
        const res = await deleteUser(deleteId)

        setConfirmOption((state) => ({ ...state, open: false }))
        setUsers((state) => state.filter((item) => item._id !== res.data._id))
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
      const res = await getUsers()

      setUsers(res.data)
    }

    getData()
  }, [])

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right" style={{ minWidth: 170 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <ModeEditIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', mr: 3 }}
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', user: row })}
                      />
                      <DeleteIcon
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <UserForm type={formOption.type} onSubmit={onSubmit} user={formOption.user} />
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

UserAdmin.Layout = AdminLayout

export default UserAdmin
