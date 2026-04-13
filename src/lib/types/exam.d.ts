declare interface ExamCount {
  questions: number;
}

declare interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  diploma: Diploma;
  _count: ExamCount;
}

declare interface ExamsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

declare interface ExamsPayload {
  data: Exam[];
  metadata: ExamsMetadata;
}

declare interface ExamsResponse {
  status: boolean;
  message: string;
  code: number;
  payload: ExamsPayload;
}

declare interface GetExamsParams {
  diplomaId: string;
  page?: number;
  limit?: number;
}
