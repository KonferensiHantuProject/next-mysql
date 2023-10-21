import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { useState } from 'react'
import AppContext from '@/context/appContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home({users}) {

  const [myUser, setMyUser] = useState(users);

  return (
    <>
      <Head>
        <title>Next JS MYSQL</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Description" content="NextJS MySQL CRUD tutorial"/>
        <meta name="author" content = "anand346@BePractical" />
        <meta name="og:url" content = "https://www.linkedin.com/in/anand346" />
      </Head>
      <main>
        <AppContext.Provider value={{ 
          users: myUser,
          setMyUser: setMyUser
         }}>
          <Layout></Layout>
         </AppContext.Provider>
      </main>
    </>
  )
}

// Get Data From API
export async function getServerSideProps(){

  const response = await fetch("http://localhost:3000/api/users");

  // USers
  const users = await response.json();

  return {
    props: {
      users : users
    }
  }
}