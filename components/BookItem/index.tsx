import { Book } from '@Model'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

export interface BookItemProps {
  book: Book
}

export default function BookItem(props: BookItemProps) {
  const { book } = props

  return (
    <Card>
      <CardMedia component="img" height="220" image="https://picsum.photos/seed/picsum/200/300" alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {book.name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {book.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
