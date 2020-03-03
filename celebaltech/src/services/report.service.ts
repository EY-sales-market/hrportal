import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class ReportService {

  url = "http://localhost:8000/report";

  constructor(private Http:HttpClient) {

   }

getData(obj){

  return this.Http.post(this.url + "/upd", {
   obj
  });
}
getDatahistory(obj){

  return this.Http.post(this.url + "/history", {
   obj
  });
}
upadteLeave(obj) {
  obj=JSON.stringify(obj);
  return this.Http.post(this.url + "/leaveMang", {
    data: obj
  });
}
approveLeave(obj) {
  obj=JSON.stringify(obj);
  return this.Http.post(this.url + "/approveLeave", {
    data: obj
  });
}
getLeaveData() {

  return this.Http.get(this.url + "/leaveData", {

  });
}
getUpdateAttendance() {
  return this.Http.get(this.url + "/updateAttendance", {
  });
}
   getReport(obj) {
    obj=JSON.stringify(obj);
    return this.Http.post(this.url + "/", {
      data: obj
    });
  }
  getLeaveHistoryEmployee(obj){
    // obj=JSON.stringify(obj);
    return this.Http.post(this.url + "/leaveHistoryEmployee", {
     data:obj
    });
  }
  getLeaveHistoryAdmin(obj){
    // obj=JSON.stringify(hello);
    return this.Http.post(this.url + "/leaveHistoryAdmin", {
      // data: obj
    });
  }

  getAllReport(obj) {
    obj=JSON.stringify(obj);
    return this.Http.post(this.url + "/all", {
      data: obj
    });
  }
  updateReport(obj) {
    obj=JSON.stringify(obj);
    return this.Http.post(this.url + "/update", {
      data: obj
    });
  }

  appoveUpdateReport(obj){
    obj=JSON.stringify(obj);
    return this.Http.post(this.url + "/approveUpdateReport", {
      data: obj
    });
  }


  }
