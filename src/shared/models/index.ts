export interface User {
  userId: number;
  isExisting: boolean;
  telegramId: number;
  fullName: string;
}

export interface Surah {
  id: number;
  name: string;
  ayahSize: number;
}

export interface Issue {
  id: number;
  userId: number;
  repetitionCount: number;
  durationMinutes: number;
  dateLearned: string;
  from: number;
  to: number;
  surahId: number;
  learnTypeId: number;
}

export interface PostIssue {
  learnTypeId: number;
  surahId: number | null;
  from: number;
  to: number;
  dateLearned: string;
  durationMinutes: number;
  repetitionCount: number;
  userId: number;
}
