// submission.d.ts

export interface SubmitExamRequest {
  examId: string;
  startedAt: string;
  answers: SubmitAnswer[];
}

export interface SubmitAnswer {
  questionId: string;
  answerId: string;
}
export interface SubmitExamResponse {
  message: string;
  submission: Submission;
  analytics: AnswerAnalytics[];
}

export interface Submission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
}

export interface AnswerAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: AnswerOption | null;
  correctAnswer: AnswerOption;
  isCorrect: boolean;
}

export interface AnswerOption {
  id: string;
  text: string;
}
