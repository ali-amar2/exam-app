declare type Answer = {
  answer: string;
  key: string;
};

declare type Question = DatabaseProperties & {
  question: string;
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  correct: string | string[];
  subject:
    | (DatabaseProperties & {
        name: string;
        icon: string;
      })
    | null;
  exam: Exam;
};
