import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map,tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Observable, Subject, of } from "rxjs";
import { User } from '../_models';
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private currentUser = new Subject<User>();

  public userEmitter = this.currentUser.asObservable();
  userEmitChange(usr: User) {
    this.currentUser.next(usr);
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username: username,
        password: password
      })
      .pipe(
        tap((user) => this.userEmitChange(user)),
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // localStorage.setItem("currentUser", JSON.stringify(user));
           
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            // localStorage.setItem("currentUser", JSON.stringify(data));
          }
        //   localStorage.setItem("currentUser", JSON.stringify(user));
          return user;
        })
      );
  }
  loginGoogle(userData) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate/google`, {
        username: userData.email,
        // token: userData.idToken,
        lastName: userData.name,
        image: userData.image,
        provider: userData.provider

      })
      .pipe(
        tap((user) => this.userEmitChange(user)),
        map(user => {
          console.log("user",{user});
          // login successful if there's a jwt token in the response
          if (user) {
            // localStorage.setItem("currentUser", JSON.stringify(user));
           
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            // localStorage.setItem("currentUser", JSON.stringify(data));
          }
        //   localStorage.setItem("currentUser", JSON.stringify(user));
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
