import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  submissionId: string;
  questionsRespList: any[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo) { }

  async ngOnInit() {

    this.submissionId = this.route.snapshot.paramMap.get('id');
    const resp =
      await this.getAllQuestionResponsesForSubmission();

    this.questionsRespList = resp.data['submission'].questionResponses;
    // for (const qResp of questionsRespList) {
    //   this.getQuestionFromQuestionVersion(qResp.questionVersionUuid)
    //     .pipe(first())
    //     .subscribe(res => {
    //       // qResp.question 
    //       console.log(res);
    //     });
    // }

  }

// get all the questions for a submission
  async getAllQuestionResponsesForSubmission() {
    const submissonGQL = gql`
    query {
      submission(uuid: "${this.submissionId}") {
        questionResponses {
          sourceValue
          questionVersionUuid
        }
      }
    }`;

    return this.apollo.query({
      query: submissonGQL
    }).toPromise();
  }

}
