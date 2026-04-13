"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pie, PieChart } from "recharts";

export type ExamTimerChartProps = {
  durationMinutes: number;
  examId: string;
  onTimeEnd: () => void;
};

const STORAGE_KEY = (examId: string) => `exam_start_time_${examId}`;

export default function QuestionsTimerChart({
  durationMinutes,
  examId,
  onTimeEnd,
}: ExamTimerChartProps) {
  // States
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const totalSeconds = useMemo(() => durationMinutes * 60, [durationMinutes]);
  // Refs
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const endedRef = useRef(false);

  // init timer per exam
  useEffect(() => {
    const key = STORAGE_KEY(examId);
    const saved = localStorage.getItem(key);

    const start = saved
      ? Number(saved)
      : (() => {
          const now = Date.now();
          localStorage.setItem(key, String(now));
          return now;
        })();

    startRef.current = start;

    const initial = Math.max(
      totalSeconds - Math.floor((Date.now() - start) / 1000),
      0,
    );

    setTimeLeft(initial);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [examId, totalSeconds]);

  useEffect(() => {
    if (timeLeft === null) return;

    const key = STORAGE_KEY(examId);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(
        totalSeconds - Math.floor((Date.now() - startRef.current) / 1000),
        0,
      );

      setTimeLeft(remaining);

      if (remaining === 0 && !endedRef.current) {
        endedRef.current = true;
        localStorage.removeItem(key);
        onTimeEnd();
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [examId, totalSeconds, timeLeft, onTimeEnd]);

  if (timeLeft === null) {
    return <div className="w-20 h-20 text-xs text-gray-400">--</div>;
  }

  // variables
  const progress = (timeLeft / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative w-20 h-20">
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
