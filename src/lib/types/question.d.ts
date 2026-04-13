export type Answer = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  examId: string;
  answers: Answer[];
};

export type QuestionsPayload = {
  questions: Question[];
};
