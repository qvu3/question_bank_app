export interface Question {
    _id?: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';

}