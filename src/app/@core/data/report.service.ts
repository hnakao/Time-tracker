import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GlobalService } from './global.service';
import { Report} from '../models/report';

@Injectable()

export class ReportService {
  data = [{
    _id: 0,
    name_dev: 'Nick Jones',
    project_name: 'Cognoware',
    time_work: '150',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 1,
    name_dev: 'Eva Moor',
    project_name: 'MoreSnaker',
    time_work: '250',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 2,
    name_dev: 'Jack Williams',
    project_name: 'Chaskify',
    time_work: '160',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 3,
    name_dev: 'Lee Wong',
    project_name: 'Facebook',
    time_work: '100',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 4,
    name_dev: 'Alan Thompson',
    project_name: 'FishShop',
    time_work: '450',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 5,
    name_dev: 'Kate Martinez',
    project_name: 'TeleMondo',
    time_work: '350',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }, {
    _id: 6,
    name_dev: 'Carlos Julio',
    project_name: 'MDBexpress',
    time_work: '50',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  }];

  getData() {
    return this.data;
  }


// Dinamic data
private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}api/reportsets`;
  }

  getReports() {
    return this.http.get<Report[]>(this.baseUrl);
  }

  getReport(id: string) {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  createReport(report: Report) {
    return this.http.post(this.baseUrl, report);
  }

  updateReport(report: Report) {
    return this.http.put(`${this.baseUrl}/${report._id}`, report);
  }

  deleteReport(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}

