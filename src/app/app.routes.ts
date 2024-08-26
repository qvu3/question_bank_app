import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RegisterComponent } from './components/register/register.component';
import { QuestionListComponent } from './components/question-list/question-list.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'quiz', component: QuizComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'question-list', component: QuestionListComponent}
];
