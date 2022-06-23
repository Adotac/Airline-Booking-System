import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/models/user-account.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    if (!this.userData){
      this.userData = JSON.parse(localStorage.getItem('user')!);
    }
   }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            if (user.email == 'a@a.com') this.router.navigate(['admin']);
            else {
              this.router.navigate(['user']);
            }
          }else {
            localStorage.setItem('user', 'null');
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(username: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, username);
        window.alert('Register successful');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignOut() {
    this.router.navigate(['login']);
  }

  SetUserData(user: any, user_name: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `UserAccounts/${user.uid}`
    );
    const userData: UserAccount = {
      id: user.uid,
      email: user.email,
      username: user_name,
      flightCode_bookings: [],
    };

    console.log(userData);

    return userRef.set(userData, {
      merge: true,
    });
  }
}
