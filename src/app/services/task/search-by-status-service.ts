import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { throwError } from 'rxjs';
import { timeoutWith, map, catchError } from 'rxjs/operators';

import { AppDefaults } from '../../../environments/app.defaults';
import { environment } from '../../../environments/environment';

import { SearchByStatusData } from '../../models/search-by-status-data';


@Injectable({
  providedIn: 'root'
})
export class SearchByStatusService {
   constructor(private http: HttpClient) { }

   getFindByStatusPromise(findTaskStatus:  string) {
       const requestTimeout = AppDefaults.requestTimeout;
       const requestTimeoutMessage = AppDefaults.requestTimeoutMessage;
       const goodResponse = AppDefaults.goodResponse;
       const serverPrefix = environment.serverUrlPrefix;

	   const requestUrl = serverPrefix + '/v1/findByTaskStatus/' + findTaskStatus;

       /* Json IN, Json OUT rest service */
       let httpHeader = new HttpHeaders();
       httpHeader = httpHeader.append('Content-Type', 'application/json');
       httpHeader = httpHeader.append('Accept', 'application/json');
//  httpHeader = httpHeader.append('Access-Cobtrol-Allow-Headers', 'Content-Type');
//  httpHeader = httpHeader.append('Access-Cobtrol-Allow-Method', 'POST');
//  httpHeader = httpHeader.append('Access-Cobtrol-Allow-Origin', 'http://localhost:8080*');

//  httpHeader = httpHeader.append('Connection', 'keep-alive');


       console.log('Accept is: ' + httpHeader.getAll('Accept'));
       const requestOptions = {headers: httpHeader};

       // Promise constuctor is a single function with two parameters, called the executor
       // the executor is called during construction.

       /*  The executor receives two arguments: resolve and reject — these functions are pre-defined
           by the JavaScript engine. So we don’t need to create them. Instead, we should write the executor
           to call them when ready.
       */

       let aPromise = null;

       aPromise = new Promise((resolve, reject) => {
           this.http.get<any>(requestUrl, requestOptions)
               .pipe(
                   timeoutWith(requestTimeout, throwError(requestTimeoutMessage)),
                   map(response => {
                       // json response is auto-converted to an object
                       if (response && response.requestStatus) {
                           if (response.requestStatus !== goodResponse) {
                               reject(response);
                           } else {
                               resolve(response);
                           }
                       } else {
                           reject(response);
                       }
                   }), // end the map
                   catchError(error => {
//                       console.log('did the timeout Error');
                       reject(error);
                      return throwError(error);
                   }) // end the catchError
               ) // end the pipe
               .subscribe(
               ); // end the subscribe and the http post
       }); // end the promise

       return aPromise;
   }
  
}
