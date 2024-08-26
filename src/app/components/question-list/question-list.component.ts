import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { QuestionService } from '../../services/question.service';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
