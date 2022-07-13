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

      <main className="Layout flex flex-col max-w-screen-md mx-auto mt-20 space-y-16 p-5">

        <section className="introduction">
          <h1>PENROSE</h1>
          <p>
            Penrose is the first fully on-chain generative arts collection on Starknet built by the <a href="https://www.quasarlabs.xyz">Quasar Labs</a>. The idea is orignated from the legendary <a href="https://www.larvalabs.com/autoglyphs#:~:text=Autoglyphs%20are%20the%20first%20%E2%80%9Con,running%20on%20the%20Ethereum%20blockchain.">Autoglyph</a>.
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
            <div className="p-5">
              <h4>Recently Minted</h4>
              <Image width={300} height={300} layout="responsive" objectFit="cover" src="/demo.png" />
              <p className='mt-3 text-center'>PENROSE #1000</p>
            </div>
            <div className='p-5'>
              <h4>Statistics</h4>

              <div>remaining supply:</div>
              <p> 1048/2048</p>
              <div>last purchase price:</div>
              <p> 0.1E</p>
              <div>target ems:</div>
              <p> 100</p>
              <div>current token id:</div>
              <p>1001</p>
              <div>current CRISP price:</div>
              <p>0.14E</p>

              <div className="text-center h-10 outline p-2 mt-3">
                MINT
              </div>

            </div>
          </div>
        </section>

        <section className="why-penrose">
          <h2>WHY PENROSE</h2>

          <div className='grid gap-5'>
            <div>
              <h3>first on starknet</h3>
              <p>StarkNet is a permissionless decentralized ZK-Rollup operating as an L2 network over Ethereum powered by Starkware. The ZK-STARKS cryptography allows the heavy computations to be processed by a trustless setup and be verified on chain, essentially scaling up the capacity of the Ethereum layer 1. <a href="https://starknet.io/what-is-starknet/">(read more)</a></p>
            </div>

            <div>
              <h3>fully on-chain</h3>
              <p>Penrose is the first fully on-chain generative arts on Starknet. Everything - from generation to storage - is FULLY on-chain, no API, no IPFS, only blockchain. All powered by the <a href="https://twitter.com/apolynya/status/1452181305790275589">amazing ZK magic of Starknet</a>.</p>
            </div>

            <div>
              <h3>first CRISP</h3>
              <p>Penose is the first NFT collection adopting the <a href="https://www.paradigm.xyz/2022/01/constant-rate-issuance-sales-protocol">CRISP pricing mechanism</a> introduced by the Paradigm research team, a uique auction design that allows a collection to be distributed fairly at its fair price.</p>
            </div>

            <div>
              <h3>opensource primitives</h3>
              <p>Built by the <a href="https://www.quasarlabs.xyz">Quasar Labs</a>, Penrose is the first implementation of on-chain generative art and CRISP pricing mechanism in Cario and on Starknet. Everything is <a href="https://github.com/QuasarLabsXYZ">fully opensourced</a> for the builders and reserachers exploring the undiscovered potentials of the awesome Starknet.</p>
            </div>

            <div>
              <p className='text-white italic'>Do you <span className='text-orange-300'>felt</span> the magic, anon?</p>
            </div>
          </div>

        </section>

        <section className="how-penrose">
          <h2>HOW PENROSE</h2>
          <h3>(code snipet with docs here)</h3>
        </section>

        <section className="why-penrose">
          <h2>MORE</h2>
          <div className='grid grid-cols-2'>
            <li><a href="https://www.quasarlabs.xyz">Quasar Labs</a></li>
            <li><a href="https://voyager.online/">Contract</a></li>
            <li><a href="https://www.quasarlabs.xyz/team">Team</a></li>
            <li><a href="https://twitter.com/QuasarLabsXYZ">Twitter</a></li>
            <li><a href="https://github.com/QuasarLabsXYZ">Github</a></li>
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
