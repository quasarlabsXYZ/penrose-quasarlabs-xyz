import { useContext } from "react";

import { DataContext } from "../context/DataContext";

export const StatsAndMint = () => {
  const Data = useContext(DataContext)

  const onMintClick = async () => {
    console.log("Minting...")
  }
  return (
    <div className='p-5'>
      <h4>Statistics</h4>

      <div>remaining supply:</div>
      <p> {Data ? `${Data.totalSupply - Data.numToken} / ${Data.totalSupply}` : "-"}</p>
      <div>last purchase price:</div>
      <p> {Data ? Data.lastPrice : "-"}E</p>
      <div>target ems:</div>
      <p> {Data ? Data.targetEms : "-"}</p>
      <div>next token id:</div>
      <p>{Data ? Data.lastTokenId + 1 : "-"}</p>
      <div>current CRISP price:</div>
      <p>{Data ? Data.currentPrice : "-"}E</p>

      <button className="text-center h-10 outline p-2 mt-3 w-full no-underline" onClick={onMintClick}>
        MINT
      </button>

    </div>
  )
}