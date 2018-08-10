import { Subject } from 'rxjs';
// Subject is essentially the same as an EventEmmiter we could say, and it's an object that allows us to event emit and subscribe to it in other parts of the app
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
// to be able to inject a service into a service, we need to decorate the service where we want to inject the other service with the @Injectable() decorator; we want to inject the Angular router in here so we can	redirect the user whenever they authenticate or log out
export class AuthService {
  authChange = new Subject<boolean>();
  // Subject is of generic type which means it can hold a payload of different type, and we're going to pass a payload that's going to be a boolean, either true or false indicating whether we are logged in or not
  private user: User;
  // we want to store the currently authenticated user; private field because we want to access this only from inside the service

  constructor(private router: Router) {}
  // the Router allows us to route or navigate around programmatically

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
      // faking an id for now
    };
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
    // we're calling the authSuccessfully() method instead because it contains the same code as above
    this.authSuccessfully();
  }
  // called when the user signs up

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
      // faking an id for now
    };
    // this.authChange.next(true);
    // this.router.navigate(['/training']);
    // we're calling the authSuccessfully() method instead because it contains the same code as above
    this.authSuccessfully();
  }
  // called when the user logs in

  logout() {
    this.user = null;
    // resetting the user
    this.authChange.next(false);
    // whenever a user logs out we want to emit an event and we're passing false as a payload because the user is no longer logged in
    this.router.navigate(['/login']);
    // after the user logs out redirect them to the Login page
  }
  // called when the user logs out

  getUser() {
    // return this.user;
    // we can return this.user just like in the above example, and since it's an object and therefore a reference type other parts of the app could now change that object and therefore change the object in the service
    return {...this.user};
    // to prevent that, we'll return a new object and use the object spread operator to spread the properties of the user object that's stored in the service into this new object; this will break the reference and actually will return a brand new user that has the same properties but it is a different object so if other parts of the app start manipulate this object which we return here they won't manipulate the original user (up there in the class) which is a better practice than directly returning the user
  }
  // called when we need to get access to the user we stored here because it has a private accessor so it's not available to the outside

  isAuth() {
    return this.user != null;
    // if it's not equal to null then the user is authenticated so isAuth will return true; if it's equal to null this will return false
  }
  // called to check authentication of a user

  private authSuccessfully() {
    this.authChange.next(true);
    // whenever a user has been authenticated (has logged in or signed up) we want to emit an event and we're passing true as a payload because the user is logged in
    this.router.navigate(['/training']);
    // after the user has been authenticated redirect them to the Training page
  }
  // the code in this method is the same for the registerUser() and the login(), so we're writing this method here instead so we don't have duplicate code
}



// the goal of this service is to, in the end, allow us to fake a user login and inform other parts of the app about the login so that we can, for example, adjust the header and only show the logout button so the user can logout

// we'll add an event emitter in our AuthService that is used so that we can inform other parts of the app about changes in the authentication flow, in the authentication status - we are not going to use the EventEmitter Angular ships with, because we should only use that EventEmitter to create custom events which we emit in the components, instead we're going to use something different from other package, rxjs, and that's the Subject; we want to emit the event in the HeaderComponent to show or hide the appropriate links for logged in and logged out users