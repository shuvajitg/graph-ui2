import { Button } from "@/components/ui/button"
import type { ChartType } from "@/App"


type GraphListProps = {
    chartTypes: Array<{
        id: string;
        name: string;
        icon: React.ComponentType<{ className?: string }>;
    }>;
    setSelectedChartType: (chartType: ChartType) => void;
    selectedChartType: string;
    chartsRequiringNoAxes: string[];
    chartsRequiringOneAxis: string[];
    chartsRequiringBothAxes: string[]
};

function GraphList({ chartTypes, setSelectedChartType, selectedChartType, chartsRequiringNoAxes, chartsRequiringOneAxis, chartsRequiringBothAxes }: GraphListProps) {
    return (
        <div className="space-y-2 overflow-y-auto mt-4">
            <h1 className="text-xl font-semibold mb-6">Chart Types</h1>
            <div className="mb-6">
                <div className="mb-3">No Axis requir</div>
                <div className="grid grid-cols-5 gap-2">
                    {chartTypes && chartTypes.length > 0 ? (
                        chartTypes.map((chart) => {
                            return (
                                <>
                                    {
                                        chartsRequiringNoAxes.map((noaxis, index) =>
                                            noaxis === chart.id ?
                                                <Button
                                                    key={index}
                                                    onClick={() => setSelectedChartType(chart.id as ChartType)}
                                                    variant={selectedChartType === chart.id ? "default" : "outline"}
                                                    className="h-10 justify-center text-sm cursor-pointer"
                                                    size="sm"
                                                >
                                                    <chart.icon className="h-4" />
                                                </Button>
                                                : null
                                        )
                                    }
                                </>
                            )
                        })
                    ) : (
                        <div className="text-gray-500 text-sm">No chart types available</div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <div className="mb-3">One Axis requir</div>
                <div className="grid grid-cols-5 gap-2">
                    {chartTypes && chartTypes.length > 0 ? (
                        chartTypes.map((chart) => {
                            return (
                                <>
                                    {
                                        chartsRequiringOneAxis.map((noaxis, index) =>
                                            noaxis === chart.id ?
                                                <Button
                                                    key={index}
                                                    onClick={() => setSelectedChartType(chart.id as ChartType)}
                                                    variant={selectedChartType === chart.id ? "default" : "outline"}
                                                    className="h-10 justify-center text-sm cursor-pointer"
                                                    size="sm"
                                                >
                                                    <chart.icon className="h-4" />
                                                </Button>
                                                : null
                                        )
                                    }
                                </>
                            )
                        })
                    ) : (
                        <div className="text-gray-500 text-sm">No chart types available</div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <div className="mb-3">Both Axis requir</div>
                <div className="grid grid-cols-5 gap-2">
                    {chartTypes && chartTypes.length > 0 ? (
                        chartTypes.map((chart) => {
                            return (
                                <>
                                    {
                                        chartsRequiringBothAxes.map((noaxis, index) =>
                                            noaxis === chart.id ?
                                                <Button
                                                    key={index}
                                                    onClick={() => setSelectedChartType(chart.id as ChartType)}
                                                    variant={selectedChartType === chart.id ? "default" : "outline"}
                                                    className="h-10 justify-center text-sm cursor-pointer"
                                                    size="sm"
                                                >
                                                    <chart.icon className="h-4" />
                                                </Button>
                                                : null
                                        )
                                    }
                                </>
                            )
                        })
                    ) : (
                        <div className="text-gray-500 text-sm">No chart types available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GraphList