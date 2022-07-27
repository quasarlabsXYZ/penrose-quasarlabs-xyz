import Image from "next/image";
import { useContext } from "react";

import { DataContext } from "../context/DataContext";

export const RecentMint = () => {
  const Data = useContext(DataContext)

  console.log(Data ? Data.lastTokenURI.image : null)
  return (
    <div className="p-5">
      <h4>Recently Minted</h4>
      <Image
        alt="recently-minted"
        width={300}
        height={300}
        layout="responsive"
        objectFit="cover"
        src={Data ? "/demo.png" : "/demo.png"}
      />
      <p className='mt-3 text-center'>PENROSE #{Data ? Data.lastTokenId : "-"}</p>
    </div>
  )
}