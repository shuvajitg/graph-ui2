import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
};

function GraphList({ chartTypes, setSelectedChartType, selectedChartType }: GraphListProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Chart Types</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Chart Types</SheetTitle>
                </SheetHeader>
                <div className="space-y-2 px-6 overflow-y-auto">
                    {chartTypes && chartTypes.length > 0 ? (
                        chartTypes.map((chart) => {
                            const Icon = chart.icon
                            return (
                                <Button
                                    key={chart.id}
                                    onClick={() => setSelectedChartType(chart.id as ChartType)}
                                    variant={selectedChartType === chart.id ? "default" : "outline"}
                                    className="w-full justify-start text-sm"
                                    size="sm"
                                >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {chart.name}
                                </Button>
                            )
                        })
                    ) : (
                        <div className="text-gray-500 text-sm">No chart types available</div>
                    )}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default GraphList

