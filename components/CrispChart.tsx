import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import { formatEthPrice } from './StatsAndMint';

const formatData = (priceHistory: any) => {
    return [
        {
            "id": "priceHistory",
            "data": priceHistory.map((item: any) => {
                if (!item.block && !item.price) return;
                return {
                    "x": item.blockNumber,
                    "y": item.price
                }
            })
        }
    ];
}

const CrispChart = () => {
    const [priceHistory, setPriceHistory] = useState<any[] | undefined>(undefined);
    const [chartData, setChartData] = useState<any[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const priceHistory = await fetch("./api/priceHistory").then((res) => res.json())
            if (!priceHistory) return;
            const results = formatData(priceHistory);
            setPriceHistory(priceHistory);
            setChartData(results);
        }
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    })

    return (
        <div className='h-400 p-1'>
            <h3 className="text-center mt-10">CRISP PRICE HISTORY</h3>
            <div className="mb-5 h-25v">
                {
                    (priceHistory && chartData) ?
                        <ResponsiveLine
                            data={chartData}
                            margin={{ top: 10, right: 20, bottom: 40, left: 50 }}
                            curve="monotoneX"
                            xScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                            }}
                            yScale={{
                                type: 'linear',
                                min: 0,
                                max: 'auto',
                            }}
                            // colors={{ scheme: 'purples' }}
                            theme={
                                {
                                    textColor: "#d4d4d8",
                                    tooltip: {
                                        container: {
                                            background: "black",
                                        }
                                    },
                                    grid: {
                                        line: {
                                            stroke: "#BDBDBD",
                                        }
                                    }
                                }
                            }
                            axisBottom={{
                                legend: 'Block Number #',
                                legendOffset: 36,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                legend: 'Price (in ETH)',
                                legendOffset: -43,
                                legendPosition: 'middle'
                            }}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            enableSlices="x"
                            sliceTooltip={({ slice }) => {
                                return (
                                    <div
                                        style={{
                                            background: '#1a1919',
                                            padding: '9px 12px',
                                            border: '1px solid #ccc',
                                        }}
                                    >
                                        <div key={slice.points[0].id} style={{ color: slice.points[0].serieColor, fontSize: 13, padding: '3px 0', }}>
                                            <strong>Blcok No.:</strong> {Number(slice.points[0].data.x)}
                                        </div>
                                        {slice.points.map(point => (
                                            <>
                                                <div key={point.id} style={{ color: "#dbdbdb", fontSize: 12, padding: '3px 0', }}>
                                                    <strong>TokenId:</strong> #{Number(point.id.replace('priceHistory.', '')) + 1}
                                                </div>
                                                <div key={point.id} style={{ color: "#BDBDBD", fontSize: 11, padding: '3px 0', }}>
                                                    <strong>Price:</strong> {formatEthPrice(Number(point.data.y))}
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                )
                            }}
                        />
                        : null
                }
            </div>
        </div>
    )
}

export default CrispChart;