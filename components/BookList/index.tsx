import BookItem from '@Components/BookItem'
import { Grid } from '@mui/material'
import * as React from 'react'

export interface BookListProps {}

export default function BookList(_: BookListProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <BookItem />
      </Grid>
      <Grid item xs={4}>
        <BookItem />
      </Grid>
      <Grid item xs={4}>
        <BookItem />
      </Grid>
      <Grid item xs={4}>
        <BookItem />
      </Grid>
      <Grid item xs={4}>
        <BookItem />
      </Grid>
    </Grid>
  )
}
