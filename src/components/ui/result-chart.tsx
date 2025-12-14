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
        color: "#10b981",
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
        <Card className="w-[300px]">
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
                <div className="inset-0 flex flex-col gap-2 items-center justify-center mt-2">
                    <div className="flex flex-col items-baseline gap-2">
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-4 h-4 bg-emerald-500 px-2"></span>
                            <span>Correct: {correct}</span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-4 h-4 bg-red-500 px-2"></span>
                            <span>InCorrect: {total - correct}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
