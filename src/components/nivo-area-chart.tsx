import { ResponsiveLine } from "@nivo/line"
interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoAreaChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoAreaChart({ data, xKey, yKey }: NivoAreaChartProps) {
    // Ensure we have valid data
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    // Transform data for area chart
    const groupedData = data.reduce(
        (acc: Record<string, { x: string | number; y: number }[]>, item) => {
            const seriesKey = item.category || "Series 1"
            if (!acc[seriesKey]) {
                acc[seriesKey] = []
            }
            acc[seriesKey].push({
                x: item[xKey] ?? "",
                y: typeof item[yKey] === "number" ? item[yKey] : 0,
            })
            return acc
        },
        {}
    )

    const transformedData = Object.keys(groupedData).map((key) => ({
        id: key,
        data: groupedData[key].sort((a: { x: string | number; y: number }, b: { x: string | number; y: number }) => {
            if (typeof a.x === "string" && typeof b.x === "string") {
                return a.x.localeCompare(b.x)
            }
            return (a.x as number) - (b.x as number)
        }),
    }))

    return (
        <ResponsiveLine
            data={transformedData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: 0,
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xKey,
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yKey,
                legendOffset: -40,
                legendPosition: "middle",
            }}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.3}
            areaBlendMode="normal"
            useMesh={true}
            colors={{ scheme: "nivo" }}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
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
            ]}
        />
    )
}
