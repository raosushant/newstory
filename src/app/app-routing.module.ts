import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RecipientsComponent } from './components/recipients/recipients.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'recipients', component: RecipientsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
