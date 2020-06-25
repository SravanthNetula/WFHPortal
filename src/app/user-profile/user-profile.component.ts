import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Test } from "../shared/test.model";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../environments/environment';
import { NgForm, FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  pempids='';
  userDetails;
  emnm;
  emem;
  emtm;
  constructor(private userService: UserService,private http:HttpClient, private actRoute: ActivatedRoute, private router: Router,private route:ActivatedRoute) { }

  inOutForm:FormGroup = new FormGroup({
    
    empid:new FormControl(null,[Validators.required]),
    empname:new FormControl(null,[Validators.required]  ),
    empteam:new FormControl(null,[Validators.required]),
    empemail:new FormControl(null,[Validators.required]),
    empaction:new FormControl(null,[Validators.required]),

    // empname:new FormControl(null,[Validators.required]),
    // empteam:new FormControl(null,[Validators.required]),
    // empemail:new FormControl(null,[Validators.required]),
    // empaction:new FormControl(null,[Validators.required])
  })
/// getting tests
// gettingtest: Test[]=[];
// getTest(){
//   this.userService.getTest()
//   .subscribe(items =>{
//     console.log(items[0].toString);
//   })
    
  
// }
// updateProfile() {
// this.inOutForm.patchValue({
//   empname: this.emnm,
//   empteam:this.emtm,
//   empemail:this.emem
// });
// }
selectedProduct: Test = new Test();
////



value: '';
  empblur(event : any){

    





    if(this.pempids == 'Null' ){
      console.log('it is working');
      this.pempnames = '';
      this.pempteams = '';
      this.pempids = '';
      this.pempemails = '';
      
  }

    
    this.value = event.target.value ;
     this.emnm = document.getElementById('empname');
     this.emem = document.getElementById('empemail');
     this.emtm = document.getElementById('empteam');
   // alert("employee id entered"+this.value);
    // console.log(this.value);
    // let id = this.actRoute.snapshot.paramMap.get('id');
    
    console.log('just entered' +this.value);

    


    
        this.getEmpActions(this.value);
        this.getTestData(this.value);
              //this.updateProfile();
        // this.userService.getTest(this.value);
        
      // else {
      //   await this.userService.createProduct(this.selectedProduct);
      // }
    var eteam = this.userService.selectPara.empteam;
    // alert('eteam in TS'+this.userService.pempid.valueOf);
    console.log('eteam in TS'+eteam);
      this.selectedProduct = new Test();
    
      

    
    // this.userService.getEmpData().subscribe(
    //   res => {
        
    //     this.userDetails = res['employeedata'];
    //     console.log("called and received");
    //   },
    //   err => { 
    //     console.log(err);
        
    // }
    //);
  }
  teamaction: '';

  emaction(event : any){
    this.teamaction = event.target.value ;
    //alert('selected Action is '+this.teamaction);
    console.log(this.teamaction);
   // document.getElementById('act').innerHTML = this.teamvalue;
  }

  ngOnInit() {
    
      //// To disable Login and Logout Options based on Time(3pm to 8pm)


    var time =  new Date();
    //time.setMinutes(time.getMinutes() + 30)
     time.setHours( time.getHours());
     time.setMinutes(time.getMinutes());
    // if(time.getHours()>14)
    // {
    //   document.getElementById("log").setAttribute('disabled', 'true');
    //   alert("Login Option has been locked (Time)");
    //   // this.onLogout()
    // }
    // time.setHours( time.getHours());
    if(time.getHours()<20)
    {
    //  document.getElementById("logout").setAttribute('disabled', 'true');
      alert("Logout Option has been locked (Time)");
    }
    console.log('Present'+time.getHours()+'hrs'+time.getMinutes()+'minutes');

    
   
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );

  }

///////////////////////////////////////getting employee action

preaction;
size;
isDisabled:boolean = false;
getEmpActions(id: string)  {
  
  
  
  return this.http.get(environment.apiBaseUrl+ `/getallactions/${id}`)

  .subscribe(data => {
      //console.log('subscribes'+data[0]._id);  
      this.size = data['length'];
     // this.preaction = data[0].empaction;
let x = 0;
     for (let i=0; i<this.size;i++)
     {
       //alert("for data subscribed"+data[i].empaction);
       if(data[i].empaction == 'login' || data[i].empaction == 'logout')
       {
        x++ 
        alert("Hi "+data[i].empname+" You Already "+data[i].empaction+" for the day"); 
        document.getElementById(data[i].empaction).setAttribute('disabled', 'true');
        if(x == 2)
        {
          this.onLogout();
        }
       }
       
     }




     //alert("size of entries"+this.size);
      // if(data[0].empaction == 'login' || data[1].empaction == 'login')
      // {
        
      //   document.getElementById("login").setAttribute('disabled', 'true');
      //   // document.getElementById("logout").disabled = 'false';
      //   alert("Hi "+data[0].empname+" You cannot Login Again");

      // }
      

      // if(data[this.size].empaction == 'login' || data[this.size-1].empaction == 'login' && data[this.size].empaction == 'logout' || data[this.size-1].empaction == 'logout')

      // {
      //   alert("Hi "+data[0].empname+" You have Done for the day...");
      //   this.onLogout();
        
      // }
      // this.pempids = data[0].empid;
      // this.pempteams = data[0].empteam;
      // this.pempemails = data[0].empemail;
      // this.pempnames = data[0].empname;
      // this.selectTest.empid = data[0].empid;
      // this.selectTest.empname = data[0].empname;
      // this.selectTest.empteam = data[0].empteam;
      // this.selectTest.empemail = data[0].empemail;
      // this.selectPara.empid = data[0].empid;
      // this.selectPara.empname = data[0].empname;
      // this.selectPara.empteam = data[0].empteam;
      // this.selectPara.empemail = data[0].empemail;
      // console.log('employee id from TS'+this.pempids);  
      // console.log('employee name from TS'+this.pempnames);
      // console.log('employee team from TS'+this.pempteams);
      // console.log('employee email from TS'+this.pempemails);
      // console.log(JSON, null, 2);
      // console.log('inside TS pempid'+this.pempids);
      
  });
  }










////////////////////////

  
  pempemails='';
  pempteams='';
  pempnames = '';
  getTestData(id: string)  {
  console.log('inside getTestData in TS pempids'+this.pempids);
  
  
  return this.http.get(environment.apiBaseUrl+ `/some/${id}`)

  .subscribe(data => {
      console.log('subscribes'+data[0]._id);  
      this.pempids = data[0].empid;
      this.pempteams = data[0].empteam;
      this.pempemails = data[0].empemail;
      this.pempnames = data[0].empname;
      // this.selectTest.empid = data[0].empid;
      // this.selectTest.empname = data[0].empname;
      // this.selectTest.empteam = data[0].empteam;
      // this.selectTest.empemail = data[0].empemail;
      // this.selectPara.empid = data[0].empid;
      // this.selectPara.empname = data[0].empname;
      // this.selectPara.empteam = data[0].empteam;
      // this.selectPara.empemail = data[0].empemail;
      console.log('employee id from TS'+this.pempids);  
      console.log('employee name from TS'+this.pempnames);
      console.log('employee team from TS'+this.pempteams);
      console.log('employee email from TS'+this.pempemails);
      console.log(JSON, null, 2);
      console.log('inside TS pempid'+this.pempids);
      if(this.pempids == 'Null')
      {
        var name ='';
        // (document.getElementById('empname') as HTMLInputElement).value = 'namess';
        // (document.getElementById('empname') as HTMLInputElement).value = '';
        // (document.getElementById('empname') as HTMLInputElement).value = '';
        // (document.getElementById('empname') as HTMLInputElement).value = '';
        // this.pempnames='Not Registered With'+this.value;
        // this.pempemails ='Not Registered With'+this.value;
        // this.pempteams = 'Not Registered With'+this.value;

        this.pempnames='';
        this.pempemails ='';
        this.pempteams = '';
        this.pempids='';
        alert('Employee id is Not Registered')
        
      }
  });
  }




  onLog(){

    if(this.pempids != 'Null')
    {
    var edname = (document.getElementById('empname') as HTMLInputElement).value;
    var edemail = (document.getElementById('empemail') as HTMLInputElement).value;
    var edteam = (document.getElementById('empteam') as HTMLInputElement).value;
    var edaction = (document.getElementById('empaction') as HTMLInputElement).value;
      
    this.inOutForm.get('empaction').setValue(edaction);
    this.inOutForm.get('empname').setValue(edname);
    this.inOutForm.get('empemail').setValue(edemail);
    this.inOutForm.get('empteam').setValue(edteam);
    }
    if(!this.inOutForm.valid){
      // console.log(JSON.stringify(this.inOutForm.value))
      
      console.log('Invalid Form'); 
      alert('Please fill all the fields');
      return;
    }
    
    
    
    this.userService.postDetails(this.inOutForm.value)

    .subscribe(
      
      // data=> {console.log(data); this._router.navigate(['/result']);},
      data=> console.log(data),
      error=>console.error(error),
      
    )
    console.log('posting'+this.inOutForm[this.emem]);
    this.router.navigate(['/donelogout']);
}


onAuth()
{
  this.router.navigate(['/auth']);
}


  onLogdup(form: NgForm) {
    this.userService.postDetails(form.value).subscribe(
      res => {
        console.log(JSON.stringify(form))
      },
      err => {
        console.error(err)
      });
  }
  
  

  onLogout(){
    
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
val :'';
forgetin(event : any){
  this.val = event.target.value ;
}
  getin(val){
   
    this.router.navigate(['/userprofile/:id']);

    // this.route.params.subscribe(params =>{
    //   let id = params['id'];
    //   debugger;
    //   console.log(id,'its'+val);      
    // } )
  }



  

}
