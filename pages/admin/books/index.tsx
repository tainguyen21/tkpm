import { moment } from '@Configs'
import { AdminLayout } from '@Layouts'
import { Book, Category, Language, NextPageWithLayout, Publisher } from '@Model'
import {
  Box,
  Button,
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
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

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
    minWidth: 100,
    format: (category: Category[]) => category.map((item) => item.name).join(' - '),
  },
  {
    id: 'authorName',
    label: 'Tác giả',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'description',
    label: 'Mô tả',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'publisher',
    label: 'Nhà xuất bản',
    minWidth: 170,
    align: 'right',
    format: (value: Publisher) => value.name,
  },
  {
    id: 'publishDate',
    label: 'Ngày xuất bản',
    align: 'right',
    minWidth: 80,
    format: (value: Date) => moment(value).format('DD/MM/YYYY'),
  },
  {
    id: 'stock',
    label: 'Số lượng',
    minWidth: 80,
    align: 'right',
  },
  {
    id: 'language',
    label: 'Ngôn ngữ',
    minWidth: 80,
    align: 'right',
    format: (value: Language) => value.name,
  },
]

const BooksAdmin: NextPageWithLayout = () => {
  const [books, setBooks] = useState<Book[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getBooks()

      setBooks(res.data)
    }

    getData()
  }, [])

  return (
    <Box>
      <Box textAlign="end">
        <Button variant="contained" sx={{ marginBottom: (theme) => theme.spacing(3) }}>
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
                <TableCell align="right" style={{ minWidth: 80 }}>
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
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell align="right">
                      <DeleteIcon />
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
    </Box>
  )
}

BooksAdmin.Layout = AdminLayout

export default BooksAdmin
