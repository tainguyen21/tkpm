import CategoryForm from '@Components/CategoryForm'
import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import { AdminLayout } from '@Layouts'
import { Category, NextPageWithLayout } from '@Model'
import DeleteIcon from '@mui/icons-material/Delete'
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
import { createCategory, getCategories, updateCategory } from 'apis/category'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Category
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [{ id: 'name', label: 'Tên', minWidth: 170 }]

const BooksAdmin: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    category?: Category
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

  const onSubmit = async (data: Category) => {
    try {
      if (formOption.type === 'ADD') {
        const res = await createCategory(data)

        setCategories((state) => [...state, res.data])
      } else {
        const res = await updateCategory(formOption.category!._id, data)

        setCategories((state) => state.map((item) => (item._id !== formOption.category!._id ? item : res.data)))
      }

      setFormOption((state) => ({ ...state, open: false }))
    } catch (error: any) {
      console.log({ error })
      setNotiOption((state) => ({
        ...state,
        open: true,
        message: error.response?.data?.error?.message || 'Hệ thống đang bảo trì',
      }))
    }
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getCategories()

      setCategories(res.data)
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
          Thêm loại sách
        </Button>
      </Box>

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
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <ModeEditIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', mr: 3 }}
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', category: row })}
                      />
                      <DeleteIcon fontSize="large" sx={{ cursor: 'pointer' }} />
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <CategoryForm type={formOption.type} onSubmit={onSubmit} category={formOption.category} />
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

BooksAdmin.Layout = AdminLayout

export default BooksAdmin
