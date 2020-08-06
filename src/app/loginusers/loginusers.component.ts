import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // template: `
  // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  //   `,
  selector: 'app-loginusers',
  templateUrl: './loginusers.component.html',
  styleUrls: ['./loginusers.component.css']
})
export class LoginusersComponent implements OnInit {

  constructor(private userService: UserService,private http:HttpClient, private actRoute: ActivatedRoute, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getLoginUsersData
  }




  
  empname='';
  empid='';
  empemail='';
  empaction='';
  empteam='';
  justdate='';
  size:number = 0;
  countries:any = [];
  getLoginUsersData()
  {
    // return this.http.get(environment.apiBaseUrl + '/getsingle')
    
    return this.http.get('http://localhost:3000/api/getsingle')
    .subscribe(data => {
      this.countries = data;
      console.log('subscribes'+data['length']);  
      this.size = data['length']-1;
      this.empaction =data[this.size].empaction;
      this.empemail = data[this.size].empemail;
      this.empname = data[this.size].empname;
      this.empteam = data[this.size].empteam;
      this.empid = data[this.size].empid;
      
      // this.selectTest.empid = data[1].empid;
      // this.selectTest.empname = data[1].empname;
      // this.selectTest.empteam = data[1].empteam;
      // this.selectTest.empemail = data[1].empemail;
      // this.selectPara.empid = data[1].empid;
      // this.selectPara.empname = data[1].empname;
      // this.selectPara.empteam = data[1].empteam;
      // this.selectPara.empemail = data[1].empemail;
      console.log('dashboard service'+data[3].empemail);  
      // console.log('dashboard name from service'+this.selectTest.empname);
      // console.log('dashboard team from service'+this.selectTest.empteam);
      // console.log('dashboard email from service'+this.selectTest.empemail);
      console.log(JSON, null, 2);
      // console.log('inside service pempid'+this.pempid);
  });

  }
  
}
