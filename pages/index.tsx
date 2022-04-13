import BookList from '@Components/BookList'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout } from '@Model'
import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>TKPM</title>
        <meta name="TKPM" content="TKPM 19CLC HCMUS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ py: 4 }}>
        <BookList books={[]} />
      </Container>
    </>
  )
}

HomePage.Layout = MainLayout

export default HomePage
