import { ResponsiveBar } from "@nivo/bar"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoBarChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoBarChart({ data, xKey, yKey }: NivoBarChartProps) {
    // Ensure we have valid data
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    // Transform data for Nivo bar chart
    const transformedData = data.reduce((acc: any[], item) => {
        const existingItem = acc.find((d) => d[xKey] === item[xKey])
        if (existingItem) {
            existingItem[yKey] = (existingItem[yKey] || 0) + (typeof item[yKey] === "number" ? item[yKey] : 0)
        } else {
            acc.push({
                [xKey]: item[xKey],
                [yKey]: typeof item[yKey] === "number" ? item[yKey] : 0,
            })
        }
        return acc
    }, [])

    return (
        <ResponsiveBar
            data={transformedData}
            keys={[yKey]}
            indexBy={xKey}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xKey,
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yKey,
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Bar chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in ${xKey}: ${e.indexValue}`}
        />
    )
}
