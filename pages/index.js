
import Head from 'next/head'
import RationForm from '../components/RationForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Rasyon Hesaplama</title>
      </Head>
      <main className="p-4">
        <RationForm />
      </main>
    </>
  )
}
