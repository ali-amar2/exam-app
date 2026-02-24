"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useQuestions from "@/hooks/use-questions";
import { ExamMode } from "@/lib/types/exam";
import Loading from "@/app/loading";
import ExamResultChart from "@/components/ui/result-chart";
import ExamTimerChart from "./exam-timer";
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  RotateCcw,
} from "lucide-react";

export default function FetchQuestions() {
  const { exam } = useParams<{ exam: string }>();
  const { data, isLoading, isError } = useQuestions(exam);
  const [mode, setMode] = useState<ExamMode>("questions");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-[31rem]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="flex justify-center items-center h-64 text-red-500">
        Error loading questions
      </p>
    );
  }

  const questions = data.questions ?? [];

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[31rem] space-y-2">
        <p className="text-lg text-muted-foreground">
          No questions available for this exam
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-[31rem]">
        <Loading />
      </div>
    );
  }

  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const examDurationMinutes = questions[0].exam.duration;

  /* ================= Handlers ================= */

  const handleAnswer = (questionId: string, answerKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleRestart = () => {
    setMode("questions");
    setCurrentIndex(0);
    setAnswers({});
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setMode("results");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  /* ================= Result MODE ================= */

  if (mode === "results") {
    const correctCount = questions.filter(
      (q: Question) => answers[q._id] === q.correct,
    ).length;

    const incorrectCount = questions.length - correctCount;

    return (
      <div className="flex flex-col p-6 gap-6">
        <h2 className="text-2xl font-bold text-blue-600">Results:</h2>

        <div className="flex gap-6 w-full">
          <div className="flex flex-col gap-5 w-full">
            <ExamResultChart
              correct={correctCount}
              incorrect={incorrectCount}
              total={questions.length}
            />
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 border-t pt-4 max-h-72 overflow-auto border-none">
              {questions.map((q: Question, idx: number) => (
                <div key={q._id} className="p-4 rounded space-y-2">
                  <h3 className="font-semibold text-blue-600">
                    {idx + 1}. {q.question}
                  </h3>

                  {q.answers.map((a: Answer) => {
                    const isCorrect = a.key === q.correct;
                    const isUser = answers[q._id] === a.key;
                    return (
                      <div
                        key={a.key}
                        className={`p-3 rounded text-sm ${isCorrect ? "bg-green-100" : isUser ? "bg-red-100" : "bg-muted"}`}
                      >
                        {a.answer}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button onClick={handleRestart} variant="secondary" className="w-1/2">
            <RotateCcw className="w-4 mr-2" /> Restart
          </Button>

          <Link href="/" className="w-1/2">
            <Button className="w-full">
              <FolderSearch className="w-4 mr-2" /> Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ================= QUESTION MODE ================= */

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Quiz</span>
          <span>
            Question{" "}
            <span className="text-blue-600 font-bold">{currentIndex + 1}</span>{" "}
            of {questions.length}
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-blue-600">
        {currentQuestion.question}
      </h2>

      {/* Answers */}
      <RadioGroup
        key={currentQuestion._id}
        value={answers[currentQuestion._id] ?? ""}
        onValueChange={(value) => handleAnswer(currentQuestion._id, value)}
        className="space-y-3"
      >
        {currentQuestion.answers.map((a: Answer) => (
          <Label
            key={a.key}
            className="flex items-center gap-3 p-4 bg-gray-50 border rounded cursor-pointer"
          >
            <RadioGroupItem value={a.key} />
            {a.answer}
          </Label>
        ))}
      </RadioGroup>

      {/* Footer */}
      <div className="flex justify-between items-center pt-6 w-full">
        <Button
          className="w-[45%]"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 mr-1" />
          Previous
        </Button>

        <ExamTimerChart
          key={exam}
          durationMinutes={examDurationMinutes}
          onTimeEnd={() => setMode("results")}
        />

        <Button
          className="w-[45%]"
          onClick={handleNext}
          disabled={!answers[currentQuestion._id]}
        >
          {isLastQuestion ? "Submit" : "Next"}
          <ChevronRight className="w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
