import Image from "next/image";
import { useContext } from "react";

import { TokenURIContext } from "../context/TokenURIcontext";

export const processDataImage = (image: string) => {
  let results = image.replace('data:image/svg+xml,<?xml version="1.0" encoding="UTF-8"?>', "");
  results = Buffer.from(results).toString("base64");
  return "data:image/svg+xml;base64," + results;
}

export const RecentMint = () => {
  const Data = useContext(TokenURIContext)

  return (
    <div className="lg:p-5">
      <h4>Recently Minted</h4>
      <Image
        alt="recently-minted"
        width={300}
        height={300}
        layout="responsive"
        objectFit="cover"
        src={Data ? processDataImage(Data.image_uri) : "/loading.svg"}
      />
      <p className='mt-2 mb-0 text-center'>PENROSE #{Data ? Data.token_id : "-"}</p>
      <p className='text-center text-xs text-gray-600'>* view on <a className="text-gray-400" href={Data ? Data.aspect_link : null}>Aspect</a></p>
    </div>
  )
}