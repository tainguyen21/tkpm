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
        <Typography gutterBottom variant="h4" component="div">
          {book.name}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            '-webkit-line-clamp': '3',
            '-webkit-box-orient': 'vertical',
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
