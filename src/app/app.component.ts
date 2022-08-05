import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  addDoc,
  Firestore,
  collection,
  getDoc,
  collectionData,
  doc,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'firebase-frontend';
  public data: any[] = [];
  constructor(private auth: Auth, public firestore: Firestore) {}
  ngOnInit(): void {
    this.getData();
  }
  handleRegister(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response: any) => console.log(response.user))
      .catch((err) => alert(err.message));
  }

  getData() {
    const dbInstance = collection(this.firestore, 'testCollection');
    // collectionData(dbInstance).subscribe((resp) =>
    //   {
    //     console.log('Get data result:' + JSON.stringify(resp));
    //     this.data=resp;
    //   }
    // );
    getDocs(dbInstance).then((respons) => {
      this.data = [
        ...respons.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }

  handleLogin(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((response: any) => console.log(response.user))
      .catch((err) => alert(err.message));
  }

  addData(value: any) {
    const dbInstance = collection(this.firestore, 'testCollection');

    addDoc(dbInstance, value)
      .then(() => alert('Data sent'))
      .catch((err) => alert('error:: ' + err.message));
  }
  updateData(id: any) {
    console.log(id);
   let dataToUpdate = doc(this.firestore, 'testCollection', id);
    updateDoc(dataToUpdate, { email: 'tessstZmiana' });
    this.getData();
  }
}
