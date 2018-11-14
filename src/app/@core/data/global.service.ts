import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  private _apiProtocol: string = 'http';
  private _apiHost: string = 'popmii.theslappening.com';
  private _apiPort: number = 80;

  constructor() { }

  apiUrl(): any {
    return `${ this._apiProtocol }://${ this._apiHost }:${ this._apiPort }/`;
  }
}
