import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileData } from '../models/aboutMe-model';
import { FirestoreService } from '../service/firestore.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importar módulo de input de Angular Material
import { PianoClassProfile } from '../models/pianoLesson-model';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TestimoniesModule, Story } from '../models/successStories-model';
import { PromotionalModel } from '../models/promotional-model';
import { Subscription } from 'rxjs';
import { UpgradeData } from '../models/generateInterface-model';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EventProfile } from '../models/event-model';

@Component({
  selector: 'app-generate-interface',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './generate-interface.component.html',
  styleUrl: './generate-interface.component.scss',
})
export class GenerateInterfaceComponent {
  public profileForm: FormGroup;
  public pianoClassForm: FormGroup;
  public eventForm: FormGroup;
  public testimoniesForm: FormGroup;
  public promotionalForm: FormGroup;
  public subscribeArray: Subscription[] = [];
  public newFilter = new FormControl('');
  public id = '';
  @Input() profileData: ProfileData | null = null;
  @Input() pianoLessons: PianoClassProfile | null = null;
  @Input() pianoEvents: EventProfile | null = null;
  @Input() successStories: TestimoniesModule | null = null;
  @Input() promotional: PromotionalModel | null = null;
  @Input() upgradeData: UpgradeData | null = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public firestoreService: FirestoreService
  ) {
    this.profileForm = this.fb.group({
      ModulName: ['', Validators.required],
      urlFacebook: [''],
      urlSelection: [''],
      urlInstamgram: [''],
      urlTokTok: [''],
      phone: [''],
      urlYoutube: [''],
      titule: ['', Validators.required],
      whatsappMessage: [''],
      urlProfileImg: ['', Validators.required],
      textBody: ['', Validators.required],
    });

    this.pianoClassForm = this.fb.group({
      id: ['', Validators.required],
      moduleName: ['', Validators.required],
      phoneView: ['', Validators.required],
      urlPresentacion: ['', Validators.required],
      titule: ['', Validators.required],
      syllabus: this.fb.array([]),
    });

    this.eventForm = this.fb.group({
      id: ['', Validators.required],
      moduleName: ['', Validators.required],
      urlProfileImg: ['', Validators.required],
      urlProfileImgMobile: [''],
      titule: ['', Validators.required],
      textBody: ['', Validators.required],
      urlMap: [''],
      urlLink: [''],
      textUrlLink: [''],
      urlLink2: [''],
      textUrlLink2: [''],
      syllabus: this.fb.array([]),
    });

    this.promotionalForm = this.fb.group({
      id: ['', Validators.required],
      moduleName: ['', Validators.required],
      filter: this.fb.array([]), // Aquí declaras que es un array
      arrayVideos: this.fb.array([]),
    });

    this.testimoniesForm = this.fb.group({
      id: ['', Validators.required],
      moduleName: ['', Validators.required],
      stories: this.fb.array([]),
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    this.getAboutMe();
    this.getPianoLessons();
    this.getEventLessons();
    this.getSuccessStories();
    this.getPromotional();
    this.getUpgradeData();
  }

  private getAboutMe(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('aboutMe').subscribe({
        next: (aboutMe: ProfileData[]) => {
          this.profileData = aboutMe[0];
          this.profileData;
          this.profileForm.controls['ModulName'].setValue(this.profileData?.ModulName);
          this.profileForm.controls['urlFacebook'].setValue(this.profileData?.urlFacebook);
          this.profileForm.controls['urlSelection'].setValue(this.profileData?.urlSelection);
          this.profileForm.controls['urlInstamgram'].setValue(this.profileData?.urlInstamgram);
          this.profileForm.controls['urlTokTok'].setValue(this.profileData?.urlTokTok);
          this.profileForm.controls['phone'].setValue(this.profileData?.phone);
          this.profileForm.controls['urlYoutube'].setValue(this.profileData?.urlYoutube);
          this.profileForm.controls['titule'].setValue(this.profileData?.titule);
          this.profileForm.controls['whatsappMessage'].setValue(this.profileData?.whatsappMessage);
          this.profileForm.controls['urlProfileImg'].setValue(this.profileData?.urlProfileImg);
          this.profileForm.controls['textBody'].setValue(this.profileData?.textBody);
        },
      })
    );
  }

  private getPianoLessons(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('pianoLessons').subscribe({
        next: (pianoLessons: PianoClassProfile[]) => {
          this.pianoLessons = pianoLessons[0];
          this.pianoClassForm.controls['phoneView'].setValue(this.pianoLessons?.phoneView);
          this.pianoClassForm.controls['urlPresentacion'].setValue(this.pianoLessons?.urlPresentacion);
          this.fillFormWithLessonData(this.pianoLessons);
        },
      })
    );
  }

  private getEventLessons(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('eventSecciones').subscribe({
        next: (pianoEvents: EventProfile[]) => {
          this.pianoEvents = pianoEvents[0];
          this.fillFormWithLessonDataEvent(this.pianoEvents);
        },
      })
    );
  }

  private getSuccessStories(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('successStories').subscribe({
        next: (pianoLessons: TestimoniesModule[]) => {
          this.successStories = pianoLessons[0];
          this.successStoriesForm(this.successStories);
        },
      })
    );
  }

  private getPromotional(): void {
    this.subscribeArray.push(
      this.firestoreService.getCollection('promotional').subscribe({
        next: (promotional: PromotionalModel[]) => {
          this.promotional = promotional[0];
          this.populateForm(this.promotional);
        },
      })
    );
  }

  private getUpgradeData(): void {
    this.subscribeArray.push(
      this.firestoreService.getDocumentById('upgradeData', this.id).subscribe({
        next: (upgradeData: UpgradeData) => {
          this.upgradeData = upgradeData;
        },
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  // Perfil

  updateProfile(): void {
    if (this.profileForm.valid) {
      const newProfile: ProfileData = this.profileForm.value;
      this.firestoreService.updateProfile(newProfile).subscribe((ress) => {
        location.reload();
      });
    }
  }

  public upFile(event: any) {
    const file: File = event.target.files[0];
    this.firestoreService.uploadToFirebase(file).then((ress) => {
      this.profileForm.controls['urlProfileImg'].setValue(ress);
    });
  }

  // Clasews piano

  addSubtopic(topicIndex: number): void {
    const subtopicGroup = this.fb.group({
      subtopicTilule: [''],
      subtopicText: ['', Validators.required],
    });
    this.getSubtopics(topicIndex).push(subtopicGroup);
  }

  removeSubtopic(topicIndex: number, subtopicIndex: number): void {
    const subtopicsArray = this.getSubtopics(topicIndex);
    if (subtopicIndex >= 0 && subtopicIndex < subtopicsArray.length) {
      subtopicsArray.removeAt(subtopicIndex);
    }
  }

  addTopic(): void {
    const topicGroup = this.fb.group({
      topicName: ['', Validators.required],
      url: [''],
      topicBody: this.fb.array([]),
    });
    this.syllabusControls.push(topicGroup);
  }

  removeTopic(index: number): void {
    if (index >= 0 && index < this.syllabusControls.length) {
      this.syllabusControls.removeAt(index);
    }
  }

  public upFileSecsion(event: any, index: number) {
    const file: File = event.target.files[0];
    this.firestoreService.uploadToFirebaseSecsion(file).then((ress) => {
      const syllabusArray: any = this.pianoClassForm.get('syllabus');
      syllabusArray['controls'][index].controls['url'].setValue(ress);
    });
  }

  getSubtopics(topicIndex: number): FormArray {
    return this.syllabusControls.at(topicIndex).get('topicBody') as FormArray;
  }

  get syllabusControls(): FormArray {
    return this.pianoClassForm.get('syllabus') as FormArray;
  }

  updatePianoClassProfile(): void {
    const formValue: PianoClassProfile = this.pianoClassForm.value;
    this.firestoreService.updatePianoClassProfile(formValue).subscribe((ress) => {
      location.reload();
    });
  }

  private fillFormWithLessonData(data: PianoClassProfile): void {
    // Llenar los campos principales
    this.pianoClassForm.patchValue({
      id: data.id,
      moduleName: data.moduleName,
      // urlProfileImg: data.urlProfileImg,
      // textBody: data.textBody,
      titule: data.titule,
    });

    // Llenar el FormArray 'syllabus'
    const syllabusArray = this.pianoClassForm.get('syllabus') as FormArray;
    syllabusArray.clear(); // Limpiar el FormArray antes de llenarlo

    data.syllabus.forEach((topic) => {
      const topicGroup = this.fb.group({
        topicName: [topic.topicName, Validators.required],
        url: [topic.url],
        topicBody: this.fb.array(
          topic.topicBody.map((subtopic) =>
            this.fb.group({
              subtopicTilule: [subtopic.subtopicTilule],
              subtopicText: [subtopic.subtopicText, Validators.required],
            })
          )
        ),
      });

      syllabusArray.push(topicGroup);
    });
  }

  // Eventos

  addSubtopicEvent(topicIndex: number): void {
    const subtopicGroup = this.fb.group({
      subtopicTilule: [''],
      subtopicText: ['', Validators.required],
    });
    this.getSubtopicsEvent(topicIndex).push(subtopicGroup);
  }

  removeSubtopicEvent(topicIndex: number, subtopicIndex: number): void {
    const subtopicsArray = this.getSubtopicsEvent(topicIndex);
    if (subtopicIndex >= 0 && subtopicIndex < subtopicsArray.length) {
      subtopicsArray.removeAt(subtopicIndex);
    }
  }

  addTopicEvent(): void {
    const topicGroup = this.fb.group({
      topicName: ['', Validators.required],
      url: ['', Validators.required],
      urlMap: [''],
      urlLink: [''],
      textUrlLink: [''],
      urlLink2: [''],
      textUrlLink2: [''],
      topicBody: this.fb.array([]),
    });
    this.syllabusControlsEvent.push(topicGroup);
  }

  removeTopicEvent(index: number): void {
    if (index >= 0 && index < this.syllabusControlsEvent.length) {
      this.syllabusControlsEvent.removeAt(index);
    }
  }

  public upFileSecsionEvent(event: any, index: number) {
    const file: File = event.target.files[0];
    this.firestoreService.uploadToFirebaseSecsionEvent(file).then((ress) => {
      const syllabusArray: any = this.eventForm.get('syllabus');
      syllabusArray['controls'][index].controls['url'].setValue(ress);
    });
  }

  getSubtopicsEvent(topicIndex: number): FormArray {
    return this.syllabusControlsEvent.at(topicIndex).get('topicBody') as FormArray;
  }

  get syllabusControlsEvent(): FormArray {
    return this.eventForm.get('syllabus') as FormArray;
  }

  updatePianoClassProfileEvent(): void {
    const formValue: EventProfile = this.eventForm.value;
    this.firestoreService.updatePianoClassProfileEvent(formValue).subscribe((ress) => {
      location.reload();
    });
  }

  private fillFormWithLessonDataEvent(data: EventProfile): void {
    // Llenar los campos principales
    this.eventForm.patchValue({
      id: data.id,
      moduleName: data.moduleName,
      titule: data.titule,
      urlProfileImg: data.urlProfileImg,
      urlProfileImgMobile: data.urlProfileImgMobile,
      textBody: data.textBody,
      urlMap: data.urlMap,
      urlLink: data.urlLink,
      textUrlLink: data.textUrlLink,
      urlLink2: data.urlLink2,
      textUrlLink2: data.textUrlLink2,
    });

    // Llenar el FormArray 'syllabus'
    const eventFotos = this.eventForm.get('syllabus') as FormArray;
    eventFotos.clear(); // Limpiar el FormArray antes de llenarlo

    data.syllabus.forEach((topic) => {
      const topicGroup = this.fb.group({
        topicName: [topic.topicName, Validators.required],
        url: [topic.url],
        urlMap: [topic.urlMap],
        urlLink: [topic.urlLink],
        textUrlLink: [topic.textUrlLink],
        urlLink2: [topic.urlLink2],
        textUrlLink2: [topic.textUrlLink2],
        topicBody: this.fb.array(
          topic.topicBody.map((subtopic) =>
            this.fb.group({
              subtopicTilule: [subtopic.subtopicTilule],
              subtopicText: [subtopic.subtopicText, Validators.required],
            })
          )
        ),
      });

      eventFotos.push(topicGroup);
    });
  }

  public upFileEvent(event: any) {
    const file: File = event.target.files[0];
    this.firestoreService.uploadToFirebaseEvent(file, false).then((ress) => {
      // this.eventForm.controls['urlProfileImg'].setValue(ress);
    });
  }

  public upFileEventMobile(event: any) {
    const file: File = event.target.files[0];
    this.firestoreService.uploadToFirebaseEvent(file, true).then((ress) => {
      // this.eventForm.controls['urlProfileImgMobile'].setValue(ress);
    });
  }

  // Experiencias

  get storiesControls(): FormArray {
    return this.testimoniesForm.get('stories') as FormArray;
  }

  private successStoriesForm(data: TestimoniesModule): void {
    this.testimoniesForm.patchValue({
      id: data.id,
      moduleName: data.moduleName,
    });

    // Limpiar historias existentes
    this.storiesControls.clear();

    // Agregar las historias al FormArray
    data.stories.forEach((story) => {
      this.storiesControls.push(this.createStoryFormGroup(story));
    });
  }

  private createStoryFormGroup(story: Story): FormGroup {
    return this.fb.group({
      titule: [story.titule, Validators.required],
      textBody: [story.textBody, Validators.required],
      urlImg: [story.urlImg || ''],
      urlVideo: [story.urlVideo || ''],
    });
  }

  addStory(): void {
    this.storiesControls.push(
      this.fb.group({
        titule: ['', Validators.required],
        textBody: ['', Validators.required],
        urlImg: [''],
        urlVideo: [''],
      })
    );
  }

  public upFileStory(event: any, index: number) {
    const file: File = event.target.files[0];
    const storiesControls: any = this.storiesControls.controls[index];
    this.firestoreService.uploadToFirebaseStoy(file).then((ress) => {
      storiesControls.controls['urlImg'].setValue(ress);
    });
  }

  removeStory(index: number): void {
    this.storiesControls.removeAt(index);
  }

  saveTestimoniesForm(): void {
    const testimoniesModule: TestimoniesModule = this.testimoniesForm.value;
    this.firestoreService.updateTestimoniesModule(testimoniesModule).subscribe((ress) => {
      location.reload();
    });
  }

  ///////Promocional ////
  get filterControls(): FormArray {
    return this.promotionalForm.get('filter') as FormArray;
  }

  get arrayVideosControls(): FormArray {
    return this.promotionalForm.get('arrayVideos') as FormArray;
  }

  populateForm(data: PromotionalModel): void {
    // Asignar valores al formulario principal
    this.promotionalForm.patchValue({
      id: data.id,
      moduleName: data.moduleName,
    });

    // Llenar filtros dinámicos
    data.filter.forEach((filter) => {
      this.filterControls.push(this.fb.control(filter)); // Agregar cada filtro como FormControl
    });

    // Llenar videos dinámicos
    data.arrayVideos.forEach((video) => {
      this.arrayVideosControls.push(
        this.fb.group({
          description: [video.description, Validators.required],
          url: [video.url, Validators.required],
          titule: [video.titule, Validators.required],
          type: [video.type, Validators.required],
        })
      );
    });
  }

  addFilter(): void {
    const filterValue = this.newFilter.value; // Obtiene el valor del input
    if (filterValue) {
      this.promotional?.filter.push(filterValue);
      this.newFilter.reset(); // Limpia el input después de agregar
    }
  }

  public moveFilter(index: number, direction: 'up' | 'down'): void {
    if (!this.promotional?.filter) return; // Verificar que el array exista

    const filterArray = this.promotional.filter;

    if (direction === 'up' && index > 0) {
      // Mover hacia arriba
      [filterArray[index - 1], filterArray[index]] = [filterArray[index], filterArray[index - 1]];
    } else if (direction === 'down' && index < filterArray.length - 1) {
      // Mover hacia abajo
      [filterArray[index + 1], filterArray[index]] = [filterArray[index], filterArray[index + 1]];
    }
  }

  public deleteFilter(index: number): void {
    if (!this.promotional?.filter || index < 0 || index >= this.promotional.filter.length) {
      return; // Verificar que el array exista y el índice sea válido
    }

    this.promotional.filter.splice(index, 1); // Eliminar el elemento en el índice dado
  }

  addVideo(): void {
    this.arrayVideosControls.push(
      this.fb.group({
        description: ['', Validators.required],
        url: ['', Validators.required],
        titule: ['', Validators.required],
        type: ['', Validators.required],
      })
    );
  }

  removeVideo(index: number): void {
    this.arrayVideosControls.removeAt(index);
  }

  savePromotionalModel(): void {
    let promotionalForm: PromotionalModel = this.promotionalForm.value;
    promotionalForm.filter = this.promotional!.filter;
    this.firestoreService.updatePromotionalModel(promotionalForm).subscribe((ress) => {
      location.reload();
    });
  }
}
