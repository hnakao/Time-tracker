import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { HttpClient } from '@angular/common/http';
// import { GlobalService } from './global.service';

import { Project} from '../models/project';

@Injectable()

export class ProjectService {

  data: Project[] = [
    new Project('Cognoware', 150, 'First project', 60),
    new Project('Chaskify', 150, 'First project', 60),
    new Project('Booking', 150, 'First project', 60),
    new Project('Facebook', 150, 'First project', 60),
  ];


  getData(): Observable<any> {
    return observableOf(this.data);
  }

  getProjects(): Observable<Project[]> {
    return observableOf(this.data);
  }

  createProject(project: Project): Observable<Project[]> {
    /*
    let newProject: any[] = [];
    newProject = [project._id, project.projectName,
                  project.estimatedDuration, project.spentTime,
                  project.userAsig,
                  project.description]; */

    this.data.push(project);
    return observableOf(this.data);
  }

  updateProject(project: Project): Observable<any> {
    return observableOf(this.data);
  }

  deleteProject(name: string): Observable<any> {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].projectName === name) {
        index = i;
      }
    }
    if (index >= 0)
      this.data.splice(index, 1);
    return observableOf(this.data);
  }



// Dinamic data
/*
  private baseUrl: string;
    constructor(private http: HttpClient, private global: GlobalService) {
      this.baseUrl = `${this.global.apiUrl()}api/projectsets`;
    }
    getProjectsN() {
      return this.http.get<Project[]>(this.baseUrl);
    }
    getProjectN(id: string) {
      return this.http.get<Project>(`${this.baseUrl}/${id}`);
    }
    createProjectN(project: Project) {
      return this.http.post(this.baseUrl, project);
    }
    updateProjectN(project: Project) {
      return this.http.put(`${this.baseUrl}/${project._id}`, project);
    }
    deleteProjectN(id: string) {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }


   */

}

