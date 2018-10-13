import { Component, OnInit } from '@angular/core';
import {  AuthenticationService, UserService } from "../_services";
import { User } from "../_models";
import { environment } from "../../environments/environment";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  webUrl=environment.webUrl;
  currentUser;
  // socialUser;
  constructor( private authenticationService:AuthenticationService,
    private userService:UserService
     ) {
    this.authenticationService.userEmitter.subscribe(user => {
      this.currentUser = user;
      console.log("this.currentUser", this.currentUser);
    
    });
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("1", this.currentUser);
   }

  ngOnInit() {

  }
  logout(){
    console.log("logout");
    this.authenticationService.logout();
    this.currentUser = null;
    // this.router.navigate(["/login"]);
    location.reload(true);
  }
}
