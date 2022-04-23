import { AdminLayout } from '@Layouts'
import { Language, NextPageWithLayout } from '@Model'
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { getBookOrdered, getBookStatistic, getUserStatistic } from 'apis/statistic'
import { moment } from '@Configs'
import { useEffect, useState } from 'react'

interface Column {
  id: any
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => any
}

const columnsBook: readonly Column[] = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'total', label: 'Số lượt mượn', minWidth: 170 },
  {
    id: 'category',
    label: 'Loại',
    minWidth: 170,
    format: (value: any) => value.map((item: any) => item.name).join(' - '),
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
    format: (value: any) => value.name,
  },
]

const columnsUser: readonly Column[] = [
  { id: 'fullName', label: 'Tên', minWidth: 170, format: (value: any) => value || '' },
  { id: 'phone', label: 'Số điện thoại', minWidth: 170 },
  { id: 'total', label: 'Lượt mượn', minWidth: 170 },
]

const StatisticAdmin: NextPageWithLayout = () => {
  const [bookOrdered, setBookOrdered] = useState({
    week: 0,
    month: 0,
  })
  const [bookStatisticAsc, setBookStatisticAsc] = useState<any>([])
  const [bookStatisticDesc, setBookStatisticDesc] = useState<any>([])
  const [userStatisticAsc, setUserStatisticAsc] = useState<any>([])
  const [userStatisticDesc, setUserStatisticDesc] = useState<any>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const bookOrderedWeek = getBookOrdered({ type: 'week' })
        const bookOrderedMonth = getBookOrdered({ type: 'month' })

        const bookStatisticAsc = getBookStatistic({ limit: 10, sort: 1 })
        const bookStatisticDesc = getBookStatistic({ limit: 10, sort: -1 })

        const userStatisticAsc = getUserStatistic({ limit: 10, sort: 1 })
        const userStatisticDesc = getUserStatistic({ limit: 10, sort: -1 })

        const res = await Promise.all([
          bookOrderedWeek,
          bookOrderedMonth,
          bookStatisticAsc,
          bookStatisticDesc,
          userStatisticAsc,
          userStatisticDesc,
        ])

        setBookOrdered({ week: res[0].data.count, month: res[1].data.count })
        setBookStatisticAsc(res[2].data)
        setBookStatisticDesc(res[3].data)
        setUserStatisticAsc(res[4].data)
        setUserStatisticDesc(res[5].data)
      } catch (error: any) {}
    }

    getData()
  }, [])

  return (
    <Box>
      <Typography component="h1" fontSize="3rem" fontWeight={700} textAlign="center" mb="4">
        Thống kê
      </Typography>
      <Stack direction="row" justifyContent="space-around" alignItems="center" mb={4}>
        <Box textAlign="center">
          <Typography component="h3" fontSize="2.4rem" fontWeight={700}>
            Số sách được mượn trong tuần
          </Typography>
          <Typography component="span" fontSize="1.6rem">
            {bookOrdered.week}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography component="h3" fontSize="2.4rem" fontWeight={700}>
            Số sách được mượn trong tháng
          </Typography>
          <Typography component="span" fontSize="1.6rem">
            {bookOrdered.month}
          </Typography>
        </Box>
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography component="h2" fontSize="2.4rem" fontWeight={700} sx={{ marginBottom: 3 }}>
            Sách được mượn nhiều nhất
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsBook.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookStatisticDesc.map((row: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columnsBook.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? (
                                column.format(value)
                              ) : (
                                <Box
                                  sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
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
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" fontSize="2.4rem" fontWeight={700} sx={{ marginBottom: 3 }}>
            Sách được mượn ít nhất
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsBook.map((column: any) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookStatisticAsc.map((row: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columnsBook.map((column: any) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? (
                                column.format(value)
                              ) : (
                                <Box
                                  sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '3',
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
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" fontSize="2.4rem" fontWeight={700} sx={{ marginBottom: 3 }}>
            Người dùng mượn nhiều nhất
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsUser.map((column: any) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userStatisticDesc.map((row: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columnsUser.map((column: any) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" fontSize="2.4rem" fontWeight={700} sx={{ marginBottom: 3 }}>
            Người dùng mượn ít nhất
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columnsUser.map((column: any) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userStatisticAsc.map((row: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columnsUser.map((column: any) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

StatisticAdmin.Layout = AdminLayout

export default StatisticAdmin
