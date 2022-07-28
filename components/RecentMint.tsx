import Image from "next/image";
import { useContext } from "react";

import { DataContext } from "../context/DataContext";

export const processDataImage = (image: string) => {
  let results = image.replace('data:image/svg+xml,<?xml version="1.0" encoding="UTF-8"?>', "");
  const base64font = 'src:url(data:font/ttf;base64,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)'
  results = results.replace('src:url("https://penrose.quasarlabs.xyz/penrose.ttf")', base64font);
  results = Buffer.from(results).toString("base64");
  return "data:image/svg+xml;base64," + results;
}

export const RecentMint = () => {
  const Data = useContext(DataContext)

  return (
    <div className="p-5">
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