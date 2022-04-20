import BookDetail from '@Components/BookDetail'
import BookFilter from '@Components/BookFilter'
import BookList from '@Components/BookList'
import { MainLayout } from '@Layouts'
import { Book, Category, Language, NextPageWithLayout, Publisher } from '@Model'
import { Box, Container, Dialog } from '@mui/material'
import { getBooks } from 'apis/book'
import { getCategories } from 'apis/category'
import { getLanguages } from 'apis/language'
import { getPublishers } from 'apis/publisher'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { moment } from '@Configs'

const HomePage: NextPageWithLayout = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [detailOption, setDetailOption] = useState<any>({
    book: null,
    open: false,
  })

  const [category, setCategory] = useState<Category[]>([])
  const [language, setLanguage] = useState<Language[]>([])
  const [publisher, setPublisher] = useState<Publisher[]>([])

  const onFilter = async (data: Partial<Book>) => {
    try {
      if (data.publishDate) data.publishDate = moment(data.publishDate).startOf('day').toDate()

      const res = await getBooks(data)

      setBooks(res.data)
    } catch (error: any) {}
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const books = getBooks()
        const category = getCategories()
        const language = getLanguages()
        const publisher = getPublishers()

        const res = await Promise.all([books, category, language, publisher])

        setBooks(res[0].data)
        setCategory(res[1].data)
        setLanguage(res[2].data)
        setPublisher(res[3].data)
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
        <Box mb={3}>
          <BookFilter onSubmit={onFilter} category={category} language={language} publisher={publisher} />
        </Box>
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
