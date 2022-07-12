import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';

const data = [
  {
    "name": "239083271",
    "price": 100
  },
  {
    "name": "239083272",
    "price": 80
  },
  {
    "name": "239083273",
    "price": 60
  },
  {
    "name": "239083274",
    "price": 40
  },
  {
    "name": "239083275",
    "price": 70
  },
  {
    "name": "239083276",
    "price": 30
  },
];

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Penrose</title>
        <meta name="description" content="Penrose is the first fully on-chain generative arts collections on Starknet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="flex justify-between p-3">
          <div>penrose</div>
          <button>connect wallet</button>
        </div>
      </header>

      <main className="Layout flex flex-col max-w-screen-md mx-auto mt-20 space-y-10 p-5">

        <section className="introduction">
          <h1>PENROSE</h1>
          <p>
            Penrose is the first fully on-chain generative arts collection on Starknet. The idea is orignated from the legendary <a href="https://www.larvalabs.com/autoglyphs#:~:text=Autoglyphs%20are%20the%20first%20%E2%80%9Con,running%20on%20the%20Ethereum%20blockchain.">Autoglyph</a>.
          </p>
          <p>
            Each Penrose is a unique artwork that is generated on-chain and bootstraped using the <a href="https://www.paradigm.xyz/2022/01/constant-rate-issuance-sales-protocol">Constant Rate Issuance Sales Protocol (CRISP)</a> mechanism designed by the paradigm research team.
          </p>
          <p>
            All implemented in <a href="https://www.cairo-lang.org/docs/">Cairo</a> and <span className="bg-yellow-400 text-black">starkpilled</span>. :)
          </p>
        </section>

        <section className="mint">
          <h2>MINT NOW</h2>
          <p>
            Penrose is the first NFT collection adopting the CRISP pricing mechanism, a pricing mechanism that aims to sell NFTs at a targeted rate over time.
          </p>
          <p>
            Check out our implementation in Cairo <a href="https://github.com/08351ty/CRISP-cairo">here</a>.
          </p>
          <h3 className="text-center mt-10">CRISP PRICE HIST</h3>
          <div className="mb-5">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip labelStyle={{ color: "black" }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <Image width={300} height={300} src="/demo.png" />
              Recently minted: #1000
            </div>
            <div >
              <h4>Statistics</h4>

              <div>remaining supply: 100/2048</div>
              <div>last purchase price: 0.1E</div>
              <div>target ems: 100</div>
              <div>current token id: 100</div>

              <div className="text-center h-10 outline p-2 mt-3">
                MINT
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="pt-20">
        <div className="container mx-auto pt-6 text-center text-xs">
          © 2022 Quasar Labs. All rights reserved.
        </div>
      </footer>
    </div >
  )
}

export default Home
