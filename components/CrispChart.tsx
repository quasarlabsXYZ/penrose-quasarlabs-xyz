import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const CrispChart = () => {
    const [priceHistory, setPriceHistory] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setPriceHistory(await fetch("./api/priceHistory").then((res) => res.json()));
        }
        fetchData();
    })

    return (
        <div className='h-130 p-1'>
            <h3 className="text-center mt-10">CRISP PRICE HISTORY</h3>
            <div className="mb-5 h-120">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={priceHistory}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeOpacity={1} activeDot={{ r: 8 }} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="blockNumber" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}