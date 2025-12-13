export type Exam = {
    _id: string;
    title: string;
    duration: number;
    subject: string;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string;
};

export type ExamsResponse = {
    message: string;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    exams: Exam[];
};
type ExamMode = "questions" | "results";
