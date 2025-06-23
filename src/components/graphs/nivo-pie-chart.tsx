/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsivePie } from "@nivo/pie"
interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoPieChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoPieChart({ data, xKey, yKey }: NivoPieChartProps) {
    // Ensure we have valid data
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    // Transform data for Nivo pie chart
    const transformedData = data.reduce((acc: any[], item) => {
        const existingItem = acc.find((d) => d.id === item[xKey])
        if (existingItem) {
            existingItem.value += typeof item[yKey] === "number" ? item[yKey] : 0
        } else {
            acc.push({
                id: item[xKey],
                label: item[xKey],
                value: typeof item[yKey] === "number" ? item[yKey] : 0,
            })
        }
        return acc
    }, [])

    // Filter out items with zero or negative values
    const filteredData = transformedData.filter((item) => item.value > 0)

    if (filteredData.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No valid data for pie chart</div>
    }

    return (
        <ResponsivePie
            data={filteredData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
            }}
            colors={{ scheme: "nivo" }}
            legends={[
                {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: "#999",
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemTextColor: "#000",
                            },
                        },
                    ],
                },
            ]}
        />
    )
}
