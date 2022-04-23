import { moment } from '@Configs'
import { Book, Category, Language, Publisher } from '@Model'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

interface BookDetailProps {
  book: Book
}

export default function BookDetail(props: BookDetailProps) {
  const { book } = props

  return (
    <Box width={400}>
      <Box textAlign="center">
        <img
          src={
            book.url ||
            'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
          }
          alt="book"
          width={150}
          height={150}
        />
      </Box>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Tên: ${book.name}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Thể loại: ${book.category
        .map((item) => (item as Category).name)
        .join(' - ')}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Ngày xuất bản: ${moment(book.publishDate).format(
        'DD/MM/YYYY'
      )}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Tên tác giả: ${book.authorName}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Số lượng: ${book.stock}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Mô tả: ${book.description}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Ngôn ngữ: ${(book.language as Language).name}`}</Typography>
      <Typography component="p" mt={2} fontSize="1.6rem">{`Nhà xuất bản: ${
        (book.publisher as Publisher).name
      }`}</Typography>
    </Box>
  )
}
