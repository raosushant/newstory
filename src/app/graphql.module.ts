import {NgModule} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';

const uri = 'https://api-dev.newstory.io/graphql';
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({
    uri,
    headers: new HttpHeaders()
    .set('X-Api-Key', '0123456789abcdef0123456789abcdef')
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('token');
    if (!token) {
      return forward(operation);
    }

    operation.setContext({
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null)
    });

    return forward(operation);
  });

  return {
    link: concat(authMiddleware, http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
