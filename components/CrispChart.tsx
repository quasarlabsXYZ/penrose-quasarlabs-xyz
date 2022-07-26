import { useContext } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { DataContext } from '../context/DataContext';

export const CrispChart = () => {
    const Data = useContext(DataContext);

    if (!Data) { // TODO
        return (
            <>
                <h3 className="text-center mt-10">CRISP PRICE HISTORY</h3>
            </>
        )
    }

    return (
        <>
            <h3 className="text-center mt-10">CRISP PRICE HISTORY</h3>
            <div className="mb-5">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={Data.priceHist}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="blockNumber" />
                        <YAxis />
                        <Tooltip labelStyle={{ color: "black" }} />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}