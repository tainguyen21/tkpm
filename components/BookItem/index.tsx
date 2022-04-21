import { Book, Category } from '@Model'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

export interface BookItemProps {
  book: Book
  onClick: (data: any) => any
}

export default function BookItem(props: BookItemProps) {
  const { book, onClick } = props

  return (
    <Card onClick={() => onClick(book)} sx={{ cursor: 'pointer' }}>
      <CardMedia component="img" height="220" image="https://picsum.photos/seed/picsum/200/300" alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {book.name}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {book.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {book.category.map((item) => (item as Category).name).join(' - ')}
        </Typography>
      </CardContent>
    </Card>
  )
}
