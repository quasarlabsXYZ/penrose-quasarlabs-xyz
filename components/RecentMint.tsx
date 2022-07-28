import Image from "next/image";
import { useContext } from "react";

import { DataContext } from "../context/DataContext";

export const processDataImage = (image: string) => {
  console.log(image)
  let results = image.replace('data:image/svg+xml,<?xml version="1.0" encoding="UTF-8"?>', "");
  results = Buffer.from(results).toString("base64");
  console.log(results)
  return "data:image/svg+xml;base64," + results;
}

export const RecentMint = () => {
  const Data = useContext(DataContext)

  return (
    <div className="lg:p-5">
      <h4>Recently Minted</h4>
      <Image
        alt="recently-minted"
        width={300}
        height={300}
        layout="responsive"
        objectFit="cover"
        src={Data ? processDataImage(Data.lastTokenURI.image) : "/loading.svg"}
      />
      <p className='mt-3 text-center'>PENROSE #{Data ? Data.lastTokenId : "-"}</p>
    </div>
  )
}