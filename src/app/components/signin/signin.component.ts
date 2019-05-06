import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['dev@newstorycharity.org', Validators.required],
      password: ['hireme', [Validators.required]]
  });
  }

  onSubmit() {
    const signInGQL = gql`
    mutation  {
      signInUser (
        email: "${this.signInForm.controls.username.value}" ,
        password: "${this.signInForm.controls.password.value}") {
          token }
    }`;
    this.apollo.mutate({
      mutation: signInGQL
    }).subscribe(
      (resp) => {
        const token = resp.data.signInUser.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/recipients']);
        }
        console.log(resp);
      }
    );

  }


}
