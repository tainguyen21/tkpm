import BookDetail from '@Components/BookDetail'
import BookList from '@Components/BookList'
import { MainLayout } from '@Layouts'
import { Book, NextPageWithLayout } from '@Model'
import { Container, Dialog } from '@mui/material'
import { getBooks } from 'apis/book'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const HomePage: NextPageWithLayout = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [detailOption, setDetailOption] = useState<any>({
    book: null,
    open: false,
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBooks()

        setBooks(res.data)
      } catch (error: any) {}
    }

    getData()
  }, [])

  return (
    <>
      <Head>
        <title>TKPM</title>
        <meta name="TKPM" content="TKPM 19CLC HCMUS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ py: 4 }}>
        <BookList books={books} onItemClick={(book) => setDetailOption({ open: true, book: book })} />
      </Container>

      <Dialog open={detailOption.open} onClose={() => setDetailOption((state: any) => ({ ...state, open: false }))}>
        <BookDetail book={detailOption.book} />
      </Dialog>
    </>
  )
}

HomePage.Layout = MainLayout

export default HomePage
