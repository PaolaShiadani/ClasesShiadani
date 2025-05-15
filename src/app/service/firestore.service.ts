import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProfileData } from '../models/aboutMe-model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { PianoClassProfile } from '../models/pianoLesson-model';
import { TestimoniesModule } from '../models/successStories-model';
import { PromotionalModel } from '../models/promotional-model';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import imageCompression from 'browser-image-compression';
import { EventProfile } from '../models/event-model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private firestoreUpgrade: Firestore,
    private fstorage: Storage
  ) {}

  // set colescciones

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

  public getDocumentById(collection: string, id: string): Observable<any> {
    return this.firestore
      .collection(collection)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          if (doc.payload.exists) {
            const data: any = doc.payload.data();
            return { id, ...data };
          } else {
            return null; // Manejar el caso en el que el documento no exista
          }
        })
      );
  }

  // Actualiza Base de base de datos

  public updateProfile(profile: Partial<ProfileData>): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'aboutMe'}/ENuDAUPzkN98B7t7YjYd`);
    return from(setDoc(profileDocRef, profile, { merge: true }));
  }

  public updatePianoClassProfile(profile: Partial<PianoClassProfile>): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'pianoLessons'}/b9AE8HqgD846VKt6Agph`);
    return from(setDoc(profileDocRef, profile, { merge: true }));
  }
  public updatePianoClassProfileEvent(profile: Partial<EventProfile>): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'eventSecciones'}/kmnCwgwBeQJM16xpqDTu`);
    return from(setDoc(profileDocRef, profile, { merge: true }));
  }

  public updateTestimoniesModule(profile: Partial<TestimoniesModule>): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'successStories'}/ShOqfCY8Vl7qbZ5U1JXK`);
    return from(setDoc(profileDocRef, profile, { merge: true }));
  }

  public updatePromotionalModel(profile: Partial<PromotionalModel>): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'promotional'}/ghv3S75XApyArABKCtGt`);
    return from(setDoc(profileDocRef, profile, { merge: true }));
  }

  public upgradeDataPermis(): Observable<void> {
    const profileDocRef = doc(this.firestoreUpgrade, `${'upgradeData'}/lqtJrGOMFjPUmgZjik7C`);
    return from(setDoc(profileDocRef, { viewData: false }, { merge: true }));
  }

  // Storage

  async uploadToFirebase(file: File): Promise<string> {
    const fileAux = await this.convertToWebp(file);

    const storageRef = ref(this.fstorage, `Perfil/${fileAux.name}`); // Crear una referencia de almacenamiento
    await uploadBytes(storageRef, fileAux); // Subir el archivo
    const downloadUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
    const profileDocRef = doc(this.firestoreUpgrade, `${'aboutMe'}/ENuDAUPzkN98B7t7YjYd`);
    from(setDoc(profileDocRef, { urlProfileImg: downloadUrl }, { merge: true }));
    return downloadUrl;
  }

  async uploadToFirebaseEvent(file: File, isMobile: boolean): Promise<void> {
    const fileAux = await this.convertToWebp(file);

    const storageRef = ref(this.fstorage, `eventSecciones/${fileAux.name}`); // Crear una referencia de almacenamiento
    await uploadBytes(storageRef, fileAux); // Subir el archivo
    const downloadUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
    const profileDocRef = doc(this.firestoreUpgrade, `${'eventSecciones'}/kmnCwgwBeQJM16xpqDTu`);
    if (isMobile) {
      from(setDoc(profileDocRef, { urlProfileImgMobile: downloadUrl }, { merge: true }));
      console.log(downloadUrl, 'esMObile');
    } else {
      from(setDoc(profileDocRef, { urlProfileImg: downloadUrl }, { merge: true }));
    }
  }

  async uploadToFirebaseSecsion(file: File): Promise<string> {
    const fileAux = await this.convertToWebp(file);
    console.log(fileAux);
    const storageRef = ref(this.fstorage, `clasesPianoSecciones/${fileAux.name}`); // Crear una referencia de almacenamiento
    await uploadBytes(storageRef, fileAux); // Subir el archivo
    const downloadUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
    return downloadUrl;
  }

  async uploadToFirebaseSecsionEvent(file: File): Promise<string> {
    const fileAux = await this.convertToWebp(file);
    console.log(fileAux);
    const storageRef = ref(this.fstorage, `eventSecciones/${fileAux.name}`); // Crear una referencia de almacenamiento
    await uploadBytes(storageRef, fileAux); // Subir el archivo
    const downloadUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
    return downloadUrl;
  }

  async uploadToFirebaseStoy(file: File): Promise<string> {
    const fileAux = await this.convertToWebp(file);
    console.log(fileAux);
    const storageRef = ref(this.fstorage, `experiencias/${fileAux.name}`); // Crear una referencia de almacenamiento
    await uploadBytes(storageRef, fileAux); // Subir el archivo
    const downloadUrl = await getDownloadURL(storageRef); // Obtener la URL de descarga
    return downloadUrl;
  }

  async convertToWebp(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event: any) => {
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject('Error al crear el contexto del canvas');
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                  type: 'image/webp',
                });
                resolve(webpFile);
              } else {
                reject('No se pudo convertir la imagen a WebP');
              }
            },
            'image/webp',
            0.5
          );
        };

        img.onerror = () => reject('Error al cargar la imagen');
      };

      reader.onerror = () => reject('Error al leer el archivo');
      reader.readAsDataURL(file);
    });
  }
}
