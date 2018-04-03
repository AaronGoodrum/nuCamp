import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProcessHttpMsgService {

  constructor() { }

  public extractData(res: Response) {
    const body = res.json();
    console.log(body);

    return body || {};
  }

}
