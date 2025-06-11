/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveScatterPlot } from "@nivo/scatterplot"

interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoScatterChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoScatterChart({ data, xKey, yKey }: NivoScatterChartProps) {
    // Ensure we have valid data
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    // Transform data for scatter plot
    const groupedData = data.reduce((acc: any, item) => {
        const seriesKey = item.category || "Series 1"
        if (!acc[seriesKey]) {
            acc[seriesKey] = []
        }

        // Convert values to numbers, handling string values
        let xValue = item[xKey]
        let yValue = item[yKey]

        if (typeof xValue === "string") {
            // For string values, use index as x coordinate
            xValue = acc[seriesKey].length
        } else if (typeof xValue !== "number") {
            xValue = 0
        }

        if (typeof yValue !== "number") {
            yValue = 0
        }

        acc[seriesKey].push({
            x: xValue,
            y: yValue,
        })
        return acc
    }, {})

    const transformedData = Object.keys(groupedData).map((key) => ({
        id: key,
        data: groupedData[key],
    }))

    return (
        <ResponsiveScatterPlot
            data={transformedData}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            xFormat=">-.2f"
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            yFormat=">-.2f"
            blendMode="multiply"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xKey,
                legendPosition: "middle",
                legendOffset: 46,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yKey,
                legendPosition: "middle",
                legendOffset: -60,
            }}
            colors={{ scheme: "nivo" }}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: "left-to-right",
                    symbolSize: 12,
                    symbolShape: "circle",
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
        />
    )
}
