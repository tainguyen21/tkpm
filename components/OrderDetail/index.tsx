import { moment } from '@Configs'
import { Book, Order } from '@Model'
import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export interface OrderDetailProps {
  order: Order
}

export default function OrderDetail(props: OrderDetailProps) {
  const { order } = props

  return (
    <Box
      component="div"
      sx={{
        '& .MuiFormControl-root': {
          '&:not(:last-child)': {
            marginBottom: (theme) => theme.spacing(3),
          },
        },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ marginBottom: (theme) => theme.spacing(3) }} textAlign="center">
        Chi tiết phiếu mượn
      </Typography>

      <Box mb={3}>
        <Typography component="h3" fontSize="1.6rem">
          Chi tiết (Tên sách - ngày trả)
        </Typography>
        {order.details?.map((item) => (
          <Stack
            key={item._id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#eee"
            sx={{ borderRadius: '0.8rem' }}
            mt={2}
            padding={1}
          >
            <Typography component="span" fontSize="1.4rem">
              {(item.book as Book).name}
            </Typography>

            {item.status === 'PENDING' ? (
              <Typography component="span" fontSize="1.4rem">
                Chưa trả
              </Typography>
            ) : (
              // <DoneIcon fontSize="large" color="success" />
              <Typography component="span" fontSize="1.4rem">
                {moment(item.receivedDate).format('DD/MM/YYY')}
              </Typography>
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  )
}
