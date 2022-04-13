import BookItem from '@Components/BookItem'
import { Book } from '@Model'
import { Grid } from '@mui/material'
import * as React from 'react'

export interface BookListProps {
  books: Book[]
}

export default function BookList(props: BookListProps) {
  const { books = [] } = props

  return (
    <Grid container spacing={4}>
      {books.map((book) => (
        <Grid item xs={4} key={book._id}>
          <BookItem book={book} />
        </Grid>
      ))}
    </Grid>
  )
}
