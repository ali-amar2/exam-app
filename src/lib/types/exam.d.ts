export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  diploma: ExamDiploma;
  _count: ExamCount;
}
export interface ExamsPayload {
  data: Exam[];
  metadata: ExamsMetadata;
}

export interface ExamsResponse {
  status: boolean;
  code: number;
  payload: ExamsPayload;
}

export interface GetExamsParams {
  diplomaId: string;
  page?: number;
  limit?: number;
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  examId: string;
  answers: AnswerOption[];
}

export interface ExamQuestionsPayload {
  questions: ExamQuestion[];
}

export interface ExamQuestionsResponse {
  status: boolean;
  code: number;
  payload: ExamQuestionsPayload;
}

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  submittedAt: string;
}

export interface SelectedAnswer {
  id: string;
  text: string;
}

export interface CorrectAnswer {
  id: string;
  text: string;
}

export interface ExamAnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: SelectedAnswer;
  isCorrect: boolean;
  correctAnswer: CorrectAnswer;
}

export interface ResultExam {
  submission: ExamSubmission;
  analytics: ExamAnalyticsItem[];
}
