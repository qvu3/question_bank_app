import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];  // Define questions as an array of any type (or more specific type if available)
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];  // Define userAnswers as an array of strings
  showResults: boolean = false;
  score: number = 0;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      (data: any) => {  
        this.questions = data;
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  submitAnswer(answer: string): void {  
    this.userAnswers.push(answer);  
    if (answer === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults = true;
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.showResults = false;
    this.score = 0;
  }
}
