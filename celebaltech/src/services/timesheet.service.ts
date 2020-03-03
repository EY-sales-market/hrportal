import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class TimesheetService {
  emp_id;
  // url="https://timesheetsbackend.azurewebsites.net/";

  url = "http://localhost:8000/";
  constructor(private http: HttpClient) {

  }



  getEmployees() {
    return this.http.post(this.url + "employee/emp", {
      data: this.emp_id
    });
  }
  update_emp_details(data1) {
    return this.http.post(this.url + "employee/employee", {
      data: data1
    });
  }
  EditProject(data1) {
    return this.http.post(this.url + "project/edit_project", {
      data: data1
    });
  }
  CreateNewProject(data1) {
    return this.http.post(this.url + "project/project", {
      data: data1
    });
  }
  CreateNewTimesheet(data1) {
    return this.http.post(this.url + "timesheet/timesheet", {
      data: data1
    });
  }
  Edit_timesheets(data1) {
    return this.http.post(this.url + "timesheet/edit_timesheet", {
      data: data1
    });
  }
  getTimesheets( emp_id) {
    return this.http.post(this.url + "timesheet/timesheets", {
      data: emp_id
    });
  }

  getapproval(pp) {
    return this.http.post(this.url + "timesheet/approve", {
      data:pp
    });
  }
  setapprovals(aa = "", pp = "", approved_id = "") {
    return this.http.post(this.url + "timesheet/approval", {
      data: { aa, pp, approved_id }
    });
  }

  getProjects() {
    return this.http.get(this.url + "project/project");
  }

  admingetapproval() {
    return this.http.get(this.url + "admin/approve_timesheets");
  }
  adminViewTimesheets() {
    return this.http.get(this.url + "admin/view_timesheets");
  }
  getprojectID() {
    return this.http.get(this.url + "project/projectID");
  }
  removeTimesheet(data1) {
    return this.http.post(this.url + "timesheet/remove", {
      data: data1
    });
  }
  removeProjects(data1) {
    return this.http.post(this.url + "project/remove", {
      data: data1
    });
  }
  getTask_types(){
    return this.http.get(this.url + "timesheet/task_types")
  }
}
