import MessageNoti, { MessageNotiProps } from '@Components/common/MessageNoti'
import ModalConfirm from '@Components/common/ModalConfirm'
import LanguageForm from '@Components/LanguageForm'
import { AdminLayout } from '@Layouts'
import { Language, NextPageWithLayout } from '@Model'
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
import { createLanguage, deleteLanguage, getLanguages, updateLanguage } from 'apis/language'
import { useEffect, useState } from 'react'

interface Column {
  id: keyof Language
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [{ id: 'name', label: 'Tên', minWidth: 170 }]

const LanguagesAdmin: NextPageWithLayout = () => {
  const [languages, setLanguages] = useState<Language[]>([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [formOption, setFormOption] = useState<{
    open: boolean
    type: 'ADD' | 'UPDATE'
    language?: Language
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

  const [deleteId, setDeleteId] = useState<Language['_id'] | null>(null)

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

  const onSubmit = async (data: Language) => {
    try {
      if (formOption.type === 'ADD') {
        const res = await createLanguage(data)

        setLanguages((state) => [...state, res.data])
      } else {
        const res = await updateLanguage(formOption.language!._id, data)

        setLanguages((state) => state.map((item) => (item._id !== formOption.language!._id ? item : res.data)))
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
        const res = await deleteLanguage(deleteId)

        setConfirmOption((state) => ({ ...state, open: false }))
        setLanguages((state) => state.filter((item) => item._id !== res.data._id))
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
      const res = await getLanguages()

      setLanguages(res.data)
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
          Thêm ngôn ngữ
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
              {languages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                        onClick={() => setFormOption({ open: true, type: 'UPDATE', language: row })}
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
          count={languages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog onClose={handleClose} open={formOption.open}>
        <LanguageForm type={formOption.type} onSubmit={onSubmit} language={formOption.language} />
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

LanguagesAdmin.Layout = AdminLayout

export default LanguagesAdmin
