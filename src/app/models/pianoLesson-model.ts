interface SyllabusTopic {
  topicName: string;
  topicBody: {
    subtopicTilule: string;
    subtopicText: string;
  }[];
}

export interface PianoClassProfile {
  id: string;
  moduleName: string;
  urlProfileImg: string;
  syllabus: SyllabusTopic[];
  titule: string;
  textBody: string;
}
