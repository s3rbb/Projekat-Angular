import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Toy, AgeGroup, ToyType } from '../models/toy';

@Injectable({ providedIn: 'root' })
export class ToyService {
  private readonly baseUrl = 'https://toy.pequla.com/api';           // dat api, ne diraj.

  constructor(private http: HttpClient) {}

  getAllToys(): Observable<Toy[]> {
    return this.http.get<Toy[]>(`${this.baseUrl}/toy`);
  }

  getAgeGroups(): Observable<AgeGroup[]> {
    return this.http.get<AgeGroup[]>(`${this.baseUrl}/age-group`);
  }

  getTypes(): Observable<ToyType[]> {
    return this.http.get<ToyType[]>(`${this.baseUrl}/type`);
  }

  getImageUrl(imageUrl: string): string {
    return `https://toy.pequla.com${imageUrl}`;
  }
}
