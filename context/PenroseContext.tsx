import { createContext, useState, useEffect } from "react";

interface PenroseInterface {
    maxSupply: number,
    totalSupply: number,
    lastTokenId: number,
    lastTokenURI: string
}

const INITIAL_DATA: PenroseInterface = {
    maxSupply: 2048,
    totalSupply: 1000,
    lastTokenId: 1000,
    lastTokenURI: "/demo.png"
}

export const PenroseContext = createContext<PenroseInterface | undefined>(undefined)

export default function PenroseProvider({ children }: any) {
    const [penroseData, setPenroseData] = useState<PenroseInterface | undefined>(undefined)

    useEffect(() => {
        setPenroseData(INITIAL_DATA)
    }, [penroseData])

    return (
        <PenroseContext.Provider value={penroseData}>
            {children}
        </PenroseContext.Provider>
    )
}
