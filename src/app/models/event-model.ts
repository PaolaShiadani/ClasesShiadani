import { SafeResourceUrl } from '@angular/platform-browser';

interface SyllabusTopic {
  topicName: string;
  url: string;
  urlMap?: SafeResourceUrl | string;
  topicBody: {
    subtopicTilule: string;
    subtopicText: string;
  }[];
}

export interface EventProfile {
  id: string;
  moduleName: string;
  urlProfileImg: string;
  syllabus: SyllabusTopic[];
  titule: string;
  textBody: string;
  urlMap?: SafeResourceUrl | string;
}
