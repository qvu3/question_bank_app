import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = []; 
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];  
  showResults: boolean = false;
  score: number = 0;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {  
        this.questions = data;
        if (this.questions.length > 0) {
          this.currentQuestionIndex = 0;
        }
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
