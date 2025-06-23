import { ResponsiveCalendar, } from "@nivo/calendar"
import type { CalendarDatum } from "@nivo/calendar"


interface RadarChartDataItem {
    category: string
    sales?: number
    profit?: number
    value?: number
    performance?: number
    [key: string]: string | number | undefined
}

interface NivoCalendarChartProps {
    data: RadarChartDataItem[]
    xKey: string
    yKey: string
}

export function NivoCalendarChart({ data, xKey, yKey }: NivoCalendarChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>
    }

    try {
        // Transform data for calendar chart
        const calendarData: CalendarDatum[] = data
            .filter((item) => item && (item.date || item[xKey] || item[yKey]))
            .map((item, index) => ({
                day: String(item.date || `2024-01-${String((index % 30) + 1).padStart(2, "0")}`),
                value: typeof item[yKey || xKey] === "number"
                    ? (item[yKey || xKey] as number)
                    : Math.random() * 100,
            }))

        if (calendarData.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500">No valid calendar data</div>
        }

        return (
            <ResponsiveCalendar
                data={calendarData}
                from="2024-01-01"
                to="2024-12-31"
                emptyColor="#eeeeee"
                colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "row",
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: "right-to-left",
                    },
                ]}
            />
        )
    } catch {
        return <div className="flex items-center justify-center h-full text-red-500">Error rendering calendar chart</div>
    }
}
