import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class DataService {
 public userData:any;

  constructor(private Http:HttpClient) {

   }
getData(x:any){
  console.log(x);
  x=JSON.stringify(x);
  return this.Http.post("http://localhost:8000/users/foodUpdate",{
  data:x
  })
}
getVerifyy(x){
  return this.Http.post("http://localhost:8000/users/verify",{
  data:x

 })
}
getFoodVerify(x){
  console.log(x);
  x=JSON.stringify(x);
  return this.Http.post("http://localhost:8000/users/foodVerify",{
  data:x

 })
}

getFoodHistroy(x){
  return this.Http.post("http://localhost:8000/users/foodHistory",{
  data:x

 })
}
getFoodData(){
  return this.Http.get("http://localhost:8000/users/foodData",{


 })
}
setData(pp:any){
  this.userData=pp;
  console.log(this.userData);
}
getuserData(){
  return this.userData;
}



}
