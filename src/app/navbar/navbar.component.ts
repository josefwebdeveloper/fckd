import { Component, OnInit } from '@angular/core';
import {  AuthenticationService, UserService } from "../_services";
import { User } from "../_models";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  constructor( private authenticationService:AuthenticationService,
    private userService:UserService
     ) {
    this.authenticationService.userEmitter.subscribe(user => {
      this.currentUser = user;
    });
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
   }

  ngOnInit() {
  }

}
