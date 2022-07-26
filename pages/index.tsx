import type { NextPage } from 'next';
import Head from 'next/head';

import { ActionPanel } from '../components/ActionPanel';
import { CodeSnippet } from '../components/CodeSnippet';
import ConnectWallet from '../components/Connect';
import { CrispChart } from '../components/CrispChart';

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
          <ConnectWallet />
        </div>
      </header>

      <main className="Layout flex flex-col max-w-screen-md mx-auto mt-20 space-y-16 p-5">

        <section className="introduction">
          <h1>PENROSE</h1>
          <p>
            Penrose is the first fully on-chain generative art experiment on Starknet built by <a href="https://www.quasarlabs.xyz">Quasar Labs</a>. The idea is inspired by the legendary <a href="https://www.larvalabs.com/autoglyphs#:~:text=Autoglyphs%20are%20the%20first%20%E2%80%9Con,running%20on%20the%20Ethereum%20blockchain.">Autoglyphs</a>.
          </p>
          <p>
            Each Penrose is a unique artwork generated on-chain and bootstrapped using the <a href="https://www.paradigm.xyz/2022/01/constant-rate-issuance-sales-protocol">Constant Rate Issuance Sales Protocol (CRISP)</a> mechanism designed by the paradigm research team.
          </p>
          <p>
            All implemented in <a href="https://www.cairo-lang.org/docs/">Cairo</a> and <span className="bg-yellow-400 text-black">starkpilled</span>. :)
          </p>
          <p className="text-xs text-gray-500 mt-5">
            * Penrose is a highly experimental project and all operations are processed on-chain, there is no way to reverse or undo any transaction. Please be cautious and do your own research before making any operation or financial decision.
          </p>
        </section>

        <section className="mint">
          <h2>MINT NOW</h2>
          <p>
            Penrose is the first NFT collection adopting CRISP, a pricing mechanism that aims to sell NFTs at a targeted rate over time. Join us in this experiment to test out this awesome primitive!
          </p>
          <p>
            Check out our implementation in Cairo <a href="https://github.com/08351ty/CRISP-cairo">here</a>.
          </p>

          <CrispChart />
          <ActionPanel />

        </section>

        <section className="why-penrose">
          <h2>WHY PENROSE</h2>

          <div className='grid gap-5'>
            <div>
              <h3>First on Starknet</h3>
              <p>StarkNet is a permissionless, decentralized ZK-Rollup operating as an L2 network over Ethereum powered by Starkware. ZK-STARK cryptography allows heavy computation to be processed by a trustless setup and verified on-chain, solving Ethereum&apos;s scaling issues. <a href="https://starknet.io/what-is-starknet/">(Read more)</a></p>
            </div>

            <div>
              <h3>Fully on-chain</h3>
              <p>Penrose is the first fully on-chain generative art NFT on Starknet. Everything - from generation to storage - is FULLY on-chain, no API, no IPFS, only blockchain. We take advantage of the cheap compute inherent in Starknet&apos;s architecture to generate randomized, complex images; all powered by the <a href="https://twitter.com/apolynya/status/1452181305790275589">amazing ZK magic of Starknet</a>.</p>
            </div>

            <div>
              <h3>First CRISP</h3>
              <p>Penrose is the first NFT collection adopting the <a href="https://www.paradigm.xyz/2022/01/constant-rate-issuance-sales-protocol">CRISP pricing mechanism</a> conceptualized by the Paradigm research team, a unique auction design that allows a collection to be distributed at its fair price.</p>
            </div>

            <div>
              <h3>Open-source Primitives</h3>
              <p>Built by <a href="https://www.quasarlabs.xyz">Quasar Labs</a>, Penrose is the first implementation of on-chain generative art and CRISP pricing mechanism in Cairo and on Starknet. Everything is <a href="https://github.com/QuasarLabsXYZ">fully open-sourced</a> for the builders and researchers exploring the undiscovered potentials of the awesome Starknet.</p>
            </div>

            <div>
              <p className='text-white italic'>Can you <span className='text-orange-300 bg-gray-700 rounded-md'>:felt*</span> the magic, anon?</p>
            </div>
          </div>

        </section>

        <section className="how-penrose">
          <h2>HOW PENROSE</h2>
          <CodeSnippet />
        </section>

        <section className="more">
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
        <div className="container mx-auto pt-6 text-center p-5">
          © 2022 Quasar Labs. All rights reserved.
        </div>
      </footer>
    </div >
  )
}

export default Home
