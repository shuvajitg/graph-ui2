/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates"
interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoParallelCoordinatesChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoParallelCoordinatesChart({ data }: NivoParallelCoordinatesChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for parallel coordinates
        const allVariables = ["sales", "profit", "value", "performance"]
        const variables = allVariables.filter((key) => data.some((item) => item && typeof item[key] === "number"))

        if (variables.length < 2) {
            return (
                <div className="flex items-center justify-center h-full text-gray-500">Need at least 2 numeric variables</div>
            )
        }

        const transformedData = data
            .filter((item) => item && variables.some((variable) => typeof item[variable] === "number"))
            .map((item, index) => {
                const result: any = { id: index }
                variables.forEach((variable) => {
                    result[variable] = typeof item[variable] === "number" ? item[variable] : 0
                })
                return result
            })

        if (transformedData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid numeric data</div>
        }

        return (
            <ResponsiveParallelCoordinates
                data={transformedData}
                // variables={variables}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                colors={{ scheme: "category10" }}
                lineOpacity={0.6}
                axesTicksPosition="before"
                legends={[
                    {
                        anchor: "top-left",
                        direction: "column",
                        justify: false,
                        translateX: 0,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 14,
                        itemOpacity: 0.85,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]} variables={[]} />
        )
    } catch {
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                Error rendering parallel coordinates chart
            </div>
        )
    }
}
