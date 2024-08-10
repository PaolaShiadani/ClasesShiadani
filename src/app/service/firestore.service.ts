import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public getCollection(colection: string): Observable<any[]> {
    return this.firestore
      .collection(colection)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
