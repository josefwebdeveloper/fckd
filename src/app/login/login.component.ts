import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

import { AlertService, AuthenticationService } from '../_services';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private socialAuthService: AuthService ,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}



        public socialSignIn(socialPlatform : string) {
            let socialPlatformProvider;
            if(socialPlatform == "facebook"){
              socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
            }else if(socialPlatform == "google"){
              socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
            } 
            
            this.socialAuthService.signIn(socialPlatformProvider).then(
              (userData) => {
                console.log(socialPlatform+" sign in data : " , {userData});
                // Now sign-in with userData
                
                this.loading = true;
                this.authenticationService.loginGoogle(userData)
                .pipe(first())
                .subscribe(
                    data => {
                        console.log("login success");
                        // this.router.navigate([this.returnUrl]);
                        this.loading = false;
                        console.log(" this.route.snapshot.queryParams['returnUrl'] || '/'", this.route.snapshot.queryParams['returnUrl'] || '/')
                        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
              }
              
            );
          }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
