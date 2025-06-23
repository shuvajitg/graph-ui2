/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveWaffle } from "@nivo/waffle"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoWaffleChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoWaffleChart({ data, xKey, yKey }: NivoWaffleChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for waffle chart
        const validData = data.filter((item) => item && (item[xKey] || item[yKey]))

        if (validData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid data for waffle chart</div>
        }

        const waffleData = validData.reduce((acc: any[], item) => {
            const key = item[xKey || "category"] || "Unknown"
            const existingItem = acc.find((d) => d && d.id === key)
            const value = typeof item[yKey || "sales"] === "number" ? item[yKey || "sales"] : 0

            if (existingItem) {
                existingItem.value += value
            } else {
                acc.push({
                    id: key,
                    label: key,
                    value: value,
                })
            }
            return acc
        }, [])

        if (!waffleData || waffleData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid waffle data</div>
        }

        // Normalize values to percentages
        const total = waffleData.reduce((sum, item) => sum + (item ? item.value : 0), 0)

        if (total === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">No numeric data for waffle chart</div>
            )
        }

        const normalizedData = waffleData
            .filter((item) => item && item.value > 0)
            .map((item) => ({
                ...item,
                value: Math.round((item.value / total) * 100),
            }))

        if (normalizedData.length === 0) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">No positive values for waffle chart</div>
            )
        }

        return (
            <ResponsiveWaffle
                data={normalizedData}
                total={100}
                rows={10}
                columns={10}
                margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
                colors={{ scheme: "nivo" }}
                borderRadius={3}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.3]],
                }}
                // motionStiffness={90}
                // motionDamping={11}
                legends={[
                    {
                        anchor: "top-left",
                        direction: "column",
                        justify: false,
                        translateX: -100,
                        translateY: 0,
                        itemsSpacing: 4,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        itemTextColor: "#777",
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                    itemBackground: "#f7fafb",
                                },
                            },
                        ],
                    },
                ]}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering waffle chart</div>
    }
}
