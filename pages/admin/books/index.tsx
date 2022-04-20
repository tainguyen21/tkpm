import BookForm from '@Components/BookForm'
import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import ModalConfirm from '@Components/common/ModalConfirm'
import { moment } from '@Configs'
import { AdminLayout } from '@Layouts'
import { Book, Category, Language, NextPageWithLayout, Publisher } from '@Model'
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
import { createBook, deleteBook, getBooks, updateBook } from 'apis/book'
import { getCategories } from 'apis/category'
import { getLanguages } from 'apis/language'
import { getPublishers } from 'apis/publisher'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Book
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  {
    id: 'category',
    label: 'Loại',
    minWidth: 170,
    format: (value: Category[]) => value.map((item) => item.name).join(' - '),
  },
  {
    id: 'publishDate',
    label: 'Ngày xuất bản',
    minWidth: 170,
    format: (value: Date) => moment(value).format('DD/MM/YYYY'),
  },
  {
    id: 'authorName',
    label: 'Tên tác giả',
    minWidth: 170,
  },
  {
    id: 'description',
    label: 'Mô tả',
    minWidth: 220,
  },
  {
    id: 'stock',
    label: 'Số lượng',
    minWidth: 170,
  },
  {
    id: 'language',
    label: 'Ngôn ngữ',
    minWidth: 170,
    format: (value: Language) => value.name,
  },
  {
    id: 'publisher',
    label: 'Nhà xuất bản',
    minWidth: 170,
    format: (value: Publisher) => value.name,
  },
]

const BooksAdmin: NextPageWithLayout = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [publishers, setPublishers] = useState<Publisher[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    book?: Book
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

  const [deleteId, setDeleteId] = useState<Book['_id'] | null>(null)

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

  const onSubmit = async (data: Book) => {
    try {
      if (formOption.type === 'ADD') {
        const res = await createBook(data)

        setBooks((state) => [...state, res.data])
      } else {
        const res = await updateBook(formOption.book!._id, data)

        setBooks((state) => state.map((item) => (item._id !== formOption.book!._id ? item : res.data)))
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
        const res = await deleteBook(deleteId)

        setConfirmOption((state) => ({ ...state, open: false }))
        setBooks((state) => state.filter((item) => item._id !== res.data._id))
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
      const books = getBooks()
      const categories = getCategories()
      const languages = getLanguages()
      const publishers = getPublishers()

      const res = await Promise.all([books, categories, languages, publishers])

      setBooks(res[0].data)
      setCategories(res[1].data)
      setLanguages(res[2].data)
      setPublishers(res[3].data)
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
          Thêm sách
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
                <TableCell align="right" style={{ minWidth: 170 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? (
                            column.format(value)
                          ) : (
                            <Box
                              sx={{
                                display: '-webkit-box',
                                '-webkit-line-clamp': '3',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                height: '100%',
                              }}
                            >
                              {value}
                            </Box>
                          )}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <ModeEditIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', mr: 3 }}
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', book: row })}
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
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <BookForm
          type={formOption.type}
          onSubmit={onSubmit}
          book={formOption.book}
          category={categories}
          language={languages}
          publisher={publishers}
        />
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

BooksAdmin.Layout = AdminLayout

export default BooksAdmin
