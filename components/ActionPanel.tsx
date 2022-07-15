import { useContext } from "react"
import Image from "next/image"

import { PenroseContext } from "../context/PenroseContext"
import { CrispContext } from "../context/CrsipContext"

export const ActionPanel = () => {
    const PenroseData = useContext(PenroseContext)
    const CrispData = useContext(CrispContext)

    const onMintClick = async () => {
        console.log("Minting...")
    }

    return (
        <div className='grid grid-cols-2 gap-3'>
            <div className="p-5">
                <h4>Recently Minted</h4>
                <Image width={300} height={300} layout="responsive" objectFit="cover" src={PenroseData ? PenroseData.lastTokenURI : "/demo.png"} />
                <p className='mt-3 text-center'>PENROSE #{PenroseData ? PenroseData.lastTokenId : "-"}</p>
            </div>
            <div className='p-5'>
                <h4>Statistics</h4>

                <div>remaining supply:</div>
                <p> {PenroseData ? `${PenroseData.maxSupply - PenroseData.totalSupply} / ${PenroseData.maxSupply}` : "-"}</p>
                <div>last purchase price:</div>
                <p> {CrispData ? CrispData.lastPrice : "-"}E</p>
                <div>target ems:</div>
                <p> {CrispData ? CrispData.targetEms : "-"}</p>
                <div>next token id:</div>
                <p>{PenroseData ? PenroseData.lastTokenId + 1 : "-"}</p>
                <div>current CRISP price:</div>
                <p>{CrispData ? CrispData.currentPrice : "-"}E</p>

                <button className="text-center h-10 outline p-2 mt-3 w-full no-underline" onClick={onMintClick}>
                    MINT
                </button>

            </div>
        </div>
    )
}