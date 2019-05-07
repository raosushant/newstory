import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  recipientId: string;
  submissions: any[];
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
   ) { }

  async ngOnInit() {
    this.recipientId = this.route.snapshot.paramMap.get('id');
    const resp =
      await this.getAllSubmissionsForRecipient();

    // I would never do this in a production app,
    // but I couldn't find any other way to get the surveys
    // and I'm not completely familiar wih graphQL's query language yet

    // I would instead change the server to get all survey info for
    // multiple submissions
    const subData$ = [];
    for (const subId of resp.data['recipient'].submissionUuids) {
      subData$.push(this.getSubmissionData(subId));
    }

    forkJoin(subData$).subscribe((res) => {
      this.submissions = res;
    });

  }

  async getAllSubmissionsForRecipient() {
    const recipientsGQL = gql`
    query {
      recipient(uuid: "${this.recipientId}") {
        submissionUuids
      }
    }`;

    return this.apollo.query({
      query: recipientsGQL
    }).toPromise();
  }

  getSubmissionData(subID: any) {
    const recipientsGQL = gql`
    query {
      submission(uuid: "${subID}") {
        uuid
        survey {
          name,
          uuid
        }
      }
    }`;

    return this.apollo.query({
      query: recipientsGQL
    }).pipe(first());
  }

}
