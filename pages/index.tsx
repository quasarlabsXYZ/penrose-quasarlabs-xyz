import type { NextPage } from 'next';
import Head from 'next/head';
import { Contract } from 'starknet';

import dynamic from "next/dynamic";
import { Abi } from "starknet";
import penroseAbi from "../abi/penrose.json";
import ConnectWallet from '../components/Connect';
import { RecentMint } from '../components/RecentMint';
import { StatsAndMint } from '../components/StatsAndMint';
import { PENROSE_CONTRACT_ADDRESS } from "../constants";

const CrispChart = dynamic(() => import('../components/CrispChart'), { ssr: false })

const Home: NextPage = (props) => {

  return (
    <div className="">
      <Head>
        <title>Penrose</title>
        <meta name="description" content="Penrose is the first fully on-chain generative arts collections on Starknet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="flex justify-between p-3 flex-col lg:flex-row">
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
            Each Penrose is a unique artwork generated on-chain and bootstrapped using the <a href="https://www.paradigm.xyz/2022/01/constant-rate-issuance-sales-protocol">Constant Rate Issuance Sales Protocol (CRISP)</a> mechanism designed by the <a href="https://www.paradigm.xyz/team">Paradigm research team</a>.
          </p>
          <p>
            All implemented in <a href="https://www.cairo-lang.org/docs/">Cairo</a> and <span className="bg-yellow-400 text-black">starkpilled</span>.
          </p>x
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

          <div className='grid gap-3 grid-cols-1 lg:grid-cols-2'>
            <RecentMint />
            <StatsAndMint params={props} />
          </div>

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
          </div>

        </section>

        <section className="Tech">
          <h2>TECHNICAL DETAILS</h2>
          <div className='grid gap-5'>
            <div>
              <h3>Cairo</h3>
              <p>As there are no loops in Cairo, Penrose is generated through a multitude of recursive calls: each NFT in the collection uses just under 1,000,000 steps, the step count limit for Starknet.</p>
            </div>
            <div>
              <h3>Font</h3>
              <p>Penrose uses a custom font type saved on-chain to generate each individual NFT. The custom font is mapped to specific characters and hosted on-chain.</p>
            </div>
            <div>
              <h3>Immutable-X ERC721 Standard</h3>
              <p>The <a href="https://github.com/immutable/imx-starknet/blob/main/immutablex/starknet/token/erc721/presets/ERC721_Full.cairo">Immutable X ERC721 contract</a> includes token metadata that can be interpreted by Starknet wallets. There is also functionality for on-chain royalties using EIP2981. Having these features inherent within the ERC721 contract is important in setting a precedent to be maximally on-chain. </p>
            </div>
            <div>
              <h3>Protostar</h3>
              <p>Cairo's Foundry, <a href="https://docs.swmansion.com/protostar/">Protostar</a> is a testing framework for smart contract development on Starknet. Tests are written in Cairo with python cheatcodes to help properly test contracts pre-deployment.</p>
            </div>
            <div>
              <h3>Amarna</h3>
              <p><a href="https://blog.trailofbits.com/2022/04/20/amarna-static-analysis-for-cairo-programs/">Amarna</a> is a static analyzer and linter for Cairo built by Trail of Bits. The tool helps to analyze a host of potential Cairo code issues ranging from problematic felt arithmetic to unchecked under/overflows.</p>
            </div>
            <div>
              <h3>Community Libraries</h3>
              <p>The Starknet community consistently produces helpful libraries to simplify and strengthen the foundations of developing on Starknet. Penrose used various libraries built by these chads within the ecosystem:</p>
              <br />
              <li><a href="https://github.com/0xs34n/starknet.js">Starknet.js</a> by <a href="https://twitter.com/0xs34n">Sean</a> and all the open-source contributors</li>
              <li><a href="https://github.com/apibara/starknet-react">Starknet React</a> by <a href="https://twitter.com/aspectdotco">Apibara</a></li>
              <li><a href="https://aspect.readme.io/reference/intro">Aspect API</a> by <a href="https://twitter.com/aspectdotco">Aspect</a></li>
              <li><a href="https://github.com/gaetbout/starknet-array-manipulation">Array Manipulation</a> and <a href="https://github.com/gaetbout/starknet-felt-packing">Felt Packing</a> by <a href="https://twitter.com/gaetbout">Gaetbout</a></li>
              <li><a href="https://github.com/topology-gg/caistring">Caistring</a> by <a href="https://twitter.com/topology_gg">Topology</a></li>
              <li><a href="https://github.com/influenceth/cairo-math-64x61">Fixed-Point Math</a> by <a href="https://twitter.com/influenceth">Influence</a></li>
            </div>
          </div>
        </section>

        <section className="more">
          <h2>MORE</h2>
          <div className='grid grid-cols-2'>
            <li><a href="https://www.quasarlabs.xyz">Quasar Labs</a></li>
            <li><a href={"https://goerli.voyager.online/contract/" + PENROSE_CONTRACT_ADDRESS}>Contract</a></li>
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

export const getStaticProps = async () => {
  const contract = new Contract(penroseAbi as Abi, PENROSE_CONTRACT_ADDRESS)

  return {
    "props": {
      totalSupply: Number((await contract.getTotalSupply()).toString()),
      targetEms: Number((await contract.getTargetEMS()).toString()) / 2 ** 61,
      priceSpeed: Number((await contract.getPriceSpeed()).toString()) / 2 ** 61,
      priceHalflife: Number((await contract.getPriceHalfLife()).toString()),
      saleHalflife: Number((await contract.getSaleHalfLife()).toString())
    }
  }
}

export default Home
