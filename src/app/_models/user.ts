import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  lastActive: Date;
  photoUrl: string;
  faculty: string;
  specialization: string;
  year: number;
  group: number;
  city: string;
  country: string;
  photos?: Photo[];

}
