import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ExcelService } from '../shared/excel.service';

@Component({
  template: `
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    `,
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css',]
})
export class AdmindashboardComponent implements OnInit {

  constructor(private userService: UserService,private http:HttpClient, private actRoute: ActivatedRoute, private router: Router,private route:ActivatedRoute) { }

  
  ngOnInit() {

    this.getDashboardData()
    
  }

  empname='';
  empid='';
  empemail='';
  empaction='';
  empteam='';
  justdate='';
  size:number = 0;
  countries:any = [];
  len;
  all:any=[5];
  getDashboardData()
  {
    return this.http.get(environment.apiBaseUrl + '/getsingle')
    .subscribe(data => {
      this.countries = data;
      console.log('subscribes'+data['length']);  
      this.size = data['length']-1;
      this.len = data['length'];
      this.empaction =data[this.size].empaction;
      this.empemail = data[this.size].empemail;
      this.empname = data[this.size].empname;
      this.empteam = data[this.size].empteam;
      this.empid = data[this.size].empid;
      

    
      for(let x=0;x<this.len;x++)
      {
        this.all[0]=data[x].empid;
        this.all[1]=data[x].empname;
        this.all[2]=data[x].empemail;
        this.all[3]=data[x].empteam;
        this.all[4]=data[x].empaction;
        if( data[x].empaction == 'login')
        {
        this.all[5]=data[x].justdate;
        console.log("login time"+this.all[5]);
        }
        if( data[x].empaction == 'logout')
        {
          this.all[6] = data[x].justdate;
          console.log("login time"+this.all[6]);
        }
        
        //this.all[x]=data[x];
 
        
         //if(this.all[x].empname == data[x].empname && this.all[x].empaction == 'logout')
        // {
        //   this.all[x+5] = data[x].justdate;
        //   alert("All data logout"+this.all[x+5].justdate)
        // }
      }



      // this.selectTest.empid = data[1].empid;
      // this.selectTest.empname = data[1].empname;
      // this.selectTest.empteam = data[1].empteam;
      // this.selectTest.empemail = data[1].empemail;
      // this.selectPara.empid = data[1].empid;
      // this.selectPara.empname = data[1].empname;
      // this.selectPara.empteam = data[1].empteam;
      // this.selectPara.empemail = data[1].empemail;
      //console.log('dashboard service'+data[3].empemail);  
      // console.log('dashboard name from service'+this.selectTest.empname);
      // console.log('dashboard team from service'+this.selectTest.empteam);
      // console.log('dashboard email from service'+this.selectTest.empemail);
      console.log(JSON, null, 2);
      console.log(JSON, null, 2);
      // console.log('inside service pempid'+this.pempid);
  });

  } 
  exportAsXLSX():void {
    this.userService.exportAsExcelFile(this.countries, 'sample');
  }


}
