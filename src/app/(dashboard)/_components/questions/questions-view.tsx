"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSubmitExam } from "@/hooks/use-submit-exam";
import ExamResult from "../exams/exam-result";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import QuestionsTimerChart from "./questions-timer";
import { cn } from "@/lib/utils/tailwind-merge";

interface Props {
  initialData: any;
  examId: string;
}

export default function QuestionView({ initialData, examId }: Props) {
  // Hooks
  const { mutate, isPending } = useSubmitExam();

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [startedAt] = useState(() => new Date().toISOString());

  // Refs
  const hasSubmittedRef = useRef(false);

  // Variables
  const questions = initialData?.questions ?? [];

  // variables
  const currentQuestion = useMemo(() => {
    return questions[currentIndex];
  }, [questions, currentIndex]);
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = useMemo(() => {
    return questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
  }, [currentIndex, questions.length]);
  const currentAnswer = useMemo(() => {
    return currentQuestion ? (answers[currentQuestion.id] ?? "") : "";
  }, [answers, currentQuestion]);

  // Handlers
  const getFallbackAnswer = useCallback((question: any) => {
    return question?.answers?.[0]?.id;
  }, []);

  const handleAnswer = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }, [questions.length]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    hasSubmittedRef.current = false;
  }, []);

  const onAnswerChange = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      handleAnswer(currentQuestion.id, value);
    },
    [currentQuestion, handleAnswer],
  );

  // Submit Handler
  const handleSubmit = useCallback(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const formattedAnswers = questions.map((q: any) => ({
      questionId: q.id,
      answerId: answers[q.id] || getFallbackAnswer(q),
    }));

    mutate(
      { examId, startedAt, answers: formattedAnswers },
      {
        onSuccess: (data) => setResult(data),
        onError: (err: any) => alert(err.message),
      },
    );
  }, [answers, examId, mutate, questions, startedAt, getFallbackAnswer]);

  if (!questions.length) {
    return (
      <div className="text-center p-10 text-red-600">
        No questions available For This Exam.
      </div>
    );
  }

  if (result) {
    return <ExamResult result={result} onRestart={handleRestart} />;
  }

  return (
    <div className="w-full mx-auto flex flex-col p-4">
      {/* Header */}
      <div className="w-full space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Exam Session</h1>

            <p className="text-sm text-slate-500">
              Question{" "}
              <span className="text-blue-600 font-bold">
                {currentIndex + 1}
              </span>{" "}
              of {questions.length}
            </p>
          </div>

          <div className="bg-slate-50 p-2 rounded-xl border">
            <QuestionsTimerChart
              examId={examId}
              durationMinutes={10}
              onTimeEnd={() => !isPending && handleSubmit()}
            />
          </div>
        </div>

        <Progress value={progress} className="h-2 w-full" />
      </div>

      {/* Question */}
      <div className="space-y-8">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
          {currentQuestion?.text}
        </h2>

        <RadioGroup
          value={currentAnswer}
          onValueChange={onAnswerChange}
          className="grid gap-4"
        >
          {currentQuestion?.answers.map((a: any) => {
            const isSelected = currentAnswer === a.id;

            return (
              <Label
                key={a.id}
                className={cn(
                  "flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition",
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-100 bg-white hover:bg-slate-50",
                )}
              >
                <RadioGroupItem value={a.id} />
                <span
                  className={isSelected ? "text-blue-900" : "text-slate-700"}
                >
                  {a.text}
                </span>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white mt-10 border-t flex gap-4 pt-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isPending}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          className="flex-1"
          onClick={isLastQuestion ? handleSubmit : handleNext}
          disabled={!currentAnswer || isPending}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isLastQuestion ? (
            "Submit"
          ) : (
            <>
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
