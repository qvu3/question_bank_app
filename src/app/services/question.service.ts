import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
  
})
export class QuestionService {
  private apiUrl = 'http://localhost:5000/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateQuestion(id: string, question: Question): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, question);
  }
}
