import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from "../../environments/environment";
import { Observable ,of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        console.log({user});
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    deleteEvent(id: number):Observable<any> {

        return this.http.delete(`${environment.apiUrl}/users/event/` + id).pipe(
            tap(_ => console.log(`deleted hero id=${id}`)),
            catchError(this.handleError<any>('deleteEvent'))
        );
    }
    createEvent(event):Observable<any> {
        console.log({event});
        return this.http.post(`${environment.apiUrl}/users/event`, event).pipe(
            tap(event => console.log(`updated event id=`)),
      catchError(this.handleError<any>('createEvent')) 
        )
    }
    getAllEvents() {
        
        return this.http.get<any[]>(`${environment.apiUrl}/users/events`);
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
         
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
    
}