"use client";
import { Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

type ExamResultChartProps = {
    correct: number;
    incorrect: number;
    total: number;
};

const chartConfig: ChartConfig = {
    value: {
        label: "Questions",
    },
    correct: {
        label: "Correct",
        color: "#22c55e",
    },
    incorrect: {
        label: "Incorrect",
        color: "#ef4444",
    },
};

export default function ExamResultChart({
    correct,
    incorrect,
    total,
}: ExamResultChartProps) {
    const chartData: {
        status: "correct" | "incorrect";
        value: number;
        fill: string;
    }[] = [
            { status: "correct", value: correct, fill: "#10b981" },
            { status: "incorrect", value: incorrect, fill: "#ef4444" },
        ];

    return (
        <Card className="relative w-[260px]">
            <CardContent className="p-4">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[220px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="status"
                            innerRadius={70}
                            outerRadius={95}
                            strokeWidth={0}
                        />
                    </PieChart>
                </ChartContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                        {correct}/{total}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Correct
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
