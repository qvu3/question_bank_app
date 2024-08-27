import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
