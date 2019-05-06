import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {
  recipients: any[];
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    const recipientsGQL = gql`
    query {
      recipients {
        uuid
        submissionUuids
      }
    }`;

    this.apollo.query({
      query: recipientsGQL
    }).subscribe(
      (resp) => {
        this.recipients = resp.data['recipients'];
        console.log(this.recipients);
      }
    );
  }

}
