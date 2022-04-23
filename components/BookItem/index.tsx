import { Book, Category } from '@Model'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

export interface BookItemProps {
  book: Book
  onClick: (data: any) => any
}

export default function BookItem(props: BookItemProps) {
  const { book, onClick } = props

  return (
    <Card onClick={() => onClick(book)} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="220"
        image={
          book.url ||
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        }
        alt="green iguana"
      />
      <CardContent>
        <Box
          sx={{
            fontSize: '1.8rem',
            fontWeight: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          mb={2}
          component="div"
        >
          {book.name}
        </Box>
        <Box
          mb={2}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '1.6rem',
            height: 50,
          }}
        >
          {book.description}
        </Box>
        <Typography
          variant="h5"
          color="text.secondary"
          fontSize="1.6rem"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {book.category.map((item) => (item as Category).name).join(' - ')}
        </Typography>
      </CardContent>
    </Card>
  )
}
