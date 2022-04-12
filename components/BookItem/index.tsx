import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import * as React from 'react'

export interface BookItemProps {}

export default function BookItem(_: BookItemProps) {
  return (
    <Card>
      <CardMedia component="img" height="220" image="https://picsum.photos/seed/picsum/200/300" alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Lizard
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary" variant="contained">
          Share
        </Button>
      </CardActions> */}
    </Card>
  )
}
