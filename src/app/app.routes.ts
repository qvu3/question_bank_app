import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
