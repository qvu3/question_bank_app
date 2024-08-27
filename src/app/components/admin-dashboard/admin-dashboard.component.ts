import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  questions: Question[] = [];
  newQuestion: Question = { questionText: '', options: [], correctAnswer: '', explanation: '', category: '', difficulty: 'easy' };
  editMode: boolean = false;
  editingQuestionId: string | null = null;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error: any) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  addQuestion(): void {
    this.questionService.addQuestion(this.newQuestion).subscribe(
      (response: any) => {
        console.log('Question added successfully:', response);
        this.loadQuestions();
        this.resetForm();
      },
      (error: any) => {
        console.error('Error adding question:', error);
      }
    );
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id).subscribe(
      (response: any) => {
        console.log('Question deleted successfully:', response);
        this.loadQuestions();
      },
      (error: any) => {
        console.error('Error deleting question:', error);
      }
    );
  }

  editQuestion(question: Question): void {
    this.editMode = true;
    this.editingQuestionId = question._id || null;
    this.newQuestion = { ...question };
  }

  updateQuestion(): void {
    if (this.editingQuestionId) {
      console.log('Updating question with ID:', this.editingQuestionId); // Debug log
      console.log('Question Data:', this.newQuestion); // Debug log
      this.questionService.updateQuestion(this.editingQuestionId, this.newQuestion).subscribe(
        (response: any) => {
          console.log('Question updated successfully:', response);
          this.loadQuestions();
          this.resetForm();
          this.editMode = false;
          this.editingQuestionId = null;
        },
        (error: any) => {
          console.error('Error updating question:', error);
        }
      );
    } else {
      console.error('No question selected for update.');
    }
  }

  resetForm(): void {
    this.newQuestion = { questionText: '', options: [], correctAnswer: '', explanation: '', category: '', difficulty: 'easy' };
    this.editMode = false;
    this.editingQuestionId = null;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
