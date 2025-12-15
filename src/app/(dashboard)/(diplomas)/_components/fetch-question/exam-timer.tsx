"use client";
import { useEffect, useRef, useState } from "react";
import { Pie, PieChart } from "recharts";

export type ExamTimerChartProps = {
    durationMinutes: number;
    onTimeEnd: () => void;
};

export default function ExamTimerChart({
    durationMinutes,
    onTimeEnd,
}: ExamTimerChartProps) {
    const totalSeconds = durationMinutes * 60;
    const startTimeRef = useRef<number>(Date.now());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [timeLeft, setTimeLeft] = useState(totalSeconds);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const elapsedSeconds = Math.floor(
                (Date.now() - startTimeRef.current) / 1000
            );

            const remaining = totalSeconds - elapsedSeconds;

            if (remaining <= 0) {
                setTimeLeft(0);
                clearInterval(intervalRef.current!);
                onTimeEnd();
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [onTimeEnd, totalSeconds]);

    const progress = (timeLeft / totalSeconds) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="relative w-[80px] h-[80px]">
            <PieChart width={80} height={80}>
                <Pie
                    data={[
                        { value: progress, fill: "#2563eb" },
                        { value: 100 - progress, fill: "#e5e7eb" },
                    ]}
                    dataKey="value"
                    innerRadius={30}
                    outerRadius={38}
                    strokeWidth={0}
                />
            </PieChart>

            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
        </div>
    );
}
