import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import '../../assets/Scripts/smtp.js';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Admin } from "./admin.model";
import { Emp } from './emp.model';
import { Details } from "./details.model";
import { Test } from "./test.model";
import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectTest: Test = {
    empid:'',
    empname:'',
    empemail:'',
    empteam:''
    
  }; 
  selectPara: Test ={
    empid:'',
    empname:'',
    empemail:'',
    empteam:''
  };
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };
  selectedEmp: Emp = {
    empid:'',
    empname:'',
    empteam:'',
    empemail:'',
    password:''
  };
  selectedUserDetails: Details = {
    empid:'',
    empname:'',
    empteam:'',
    empemail:'',
    empaction:''
  }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postEmp(emp: Emp){
    return this.http.post(environment.apiBaseUrl+'/intodb',emp,this.noAuthHeader);
    // return this.http.post('/intodb',emp,this.noAuthHeader);
  }
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  // postUser(admin: Admin){
  //   return this.http.post(environment.apiBaseUrl+'/registeradmin',admin,this.noAuthHeader);
  // }
  
  postDetails(user: User){
    
    return this.http.post(environment.apiBaseUrl+'/foremp',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  } 

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + `/userProfile`);
  }

  
  getEmpData() {
    
    return this.http.get(environment.apiBaseUrl + '/getempdata');
  }

  ///test
  pempid='';
  pempemail='';
  pempteam='';
  getTest(id: string)  {
  console.log('inside service pempid'+this.pempid);
  return this.http.get(environment.apiBaseUrl+ `/test/${id}`)

  .subscribe(data => {
      console.log('subscribes');  
      this.selectTest.empid = data[0].empid;
      this.selectTest.empname = data[0].empname;
      this.selectTest.empteam = data[0].empteam;
      this.selectTest.empemail = data[0].empemail;
      this.selectPara.empid = data[0].empid;
      this.selectPara.empname = data[0].empname;
      this.selectPara.empteam = data[0].empteam;
      this.selectPara.empemail = data[0].empemail;
      console.log('employee id from service'+this.selectTest.empid);  
      console.log('employee name from service'+this.selectTest.empname);
      console.log('employee team from service'+this.selectTest.empteam);
      console.log('employee email from service'+this.selectTest.empemail);
      console.log(JSON, null, 2);
      console.log('inside service pempid'+this.pempid);
  });
  
  
  
}
  getTestbk() {
    console.log(res=>res.JSON());
    return this.http.get(environment.apiBaseUrl + '/test').pipe(map(res => res.toString()))
    
  }
  postTest(test: Test){
    return this.http.post(environment.apiBaseUrl+'/testp',test,this.noAuthHeader);
  }
///

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  auth(phn: string){
    this.http.get(environment.apiBaseUrl +'/getin/${id}')
  }



  getin(id: string){
    this.http.get(environment.apiBaseUrl +'/getin/${id}')
  }


////Email pass     82DFE5B574365A4A71E84F63E0D22F470F9F
////Excel generation

public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}



///
// Host:any;
// onSendEmail() {

//   Email.send({
//   Host : `smtp.elasticemail.com`,
//   Username : 'sravanth.netula22@gmail.com',
//   Password : ‘**************************’,
//   To : ‘udith.indrakantha@gmail.com’,
//   From : `udith.indrakantha@gmail.com`,
//   Subject : this.model.subject,
//   Body : `
//   <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>${this.model.name} <br /> <b>Email: </b>${this.model.email}<br /> <b>Subject: </b>${this.model.subject}<br /> <b>Message:</b> <br /> ${this.model.message} <br><br> <b>~End of Message.~</b> `
//   }).then( message => {alert(message); f.resetForm(); } );
    
//   }





}
