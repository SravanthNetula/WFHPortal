import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donelogout',
  templateUrl: './donelogout.component.html',
  styleUrls: ['./donelogout.component.css']
})
export class DonelogoutComponent implements OnInit {

  constructor( private userService:UserService, private router:Router) { }

  ngOnInit() {
  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
