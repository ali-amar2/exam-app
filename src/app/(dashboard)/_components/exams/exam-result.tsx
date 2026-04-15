"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ExamResultChart from "@/components/ui/result-chart";
import { RotateCcw, FolderSearch, Info } from "lucide-react";
import Loading from "@/app/loading";
import { ResultExam } from "@/lib/types/exam";

interface ExamResultProps {
  result: ResultExam;
  onRestart: () => void;
}
export default function ExamResult({ result, onRestart }: ExamResultProps) {
  // variables
  const data = result?.submission;
  const analytics = result?.analytics ?? [];

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 p-4 md:p-6 bg-white">
      {/* Header section*/}
      <header className="flex justify-between items-end border-b border-slate-50 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Exam Analysis
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Review your performance and detailed answers below.
          </p>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Performance Scorecard */}
        <aside className="lg:col-span-4 top-6">
          <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-8 flex flex-col items-center shadow-sm backdrop-blur-sm">
            <ExamResultChart
              correct={data.correctAnswers}
              incorrect={data.wrongAnswers}
              total={data.totalQuestions}
            />
          </div>
        </aside>

        {/* Answer Key & Breakdown */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Info className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Question Breakdown
            </span>
          </div>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {analytics.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
                  item.isCorrect
                    ? "bg-white border-slate-100 hover:border-emerald-200 shadow-sm"
                    : "bg-red-50/30 border-red-100/50 hover:border-red-200 shadow-sm"
                }`}
              >
                {/* Visual indicator for correct/wrong on the card */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${item.isCorrect ? "bg-emerald-400" : "bg-red-400"}`}
                />

                <div className="flex items-start gap-4">
                  <span
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black shadow-sm ${
                      item.isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 leading-snug mb-3">
                      {item.questionText || item.text}
                    </h3>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between p-3 gap-4 rounded-xl bg-white border border-slate-100 group-hover:shadow-sm transition-shadow">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">
                          Your Answer
                        </span>
                        <span
                          className={`text-sm font-bold ${item.isCorrect ? "text-emerald-600" : "text-red-500"}`}
                        >
                          {item.selectedAnswer?.text || "Skipped"}
                        </span>
                      </div>

                      {!item.isCorrect && (
                        <div className="flex items-center justify-between p-3 gap-3 rounded-xl bg-emerald-500/[0.03] border border-emerald-100/50">
                          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-tighter">
                            Correct Answer
                          </span>
                          <span className="text-sm font-bold text-emerald-700">
                            {item.correctAnswer?.text}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Restart & Explore Buttons */}
      <footer className="flex flex-col sm:flex-row gap-4 pt-8 mt-4 border-t border-slate-100">
        <Button
          onClick={onRestart}
          variant="outline"
          className="flex-1 h-14 border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-600 rounded-2xl font-bold transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-5 h-5 mr-3" /> Restart Exam
        </Button>
        <Link href="/" className="flex-1">
          <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-slate-200 rounded-2xl font-bold transition-all active:scale-95">
            <FolderSearch className="w-5 h-5 mr-3" /> Explore
          </Button>
        </Link>
      </footer>
    </div>
  );
}
