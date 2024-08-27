export interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';

}