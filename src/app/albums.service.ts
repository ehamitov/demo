import { Injectable } from '@angular/core';
import {ALBUMS} from './fake-db';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Album} from './models';
import { Photos } from './photos';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  BASE_URL = 'https://jsonplaceholder.typicode.com';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private client: HttpClient) { }

  getAlbums(): Observable<Album[]>{
    return this.client.get<Album[]>(`${this.BASE_URL}/albums`);
  }

  getAlbum(id: number): Observable<Album>{
    return this.client.get<Album>(`${this.BASE_URL}/albums/${id}`);
  }
  getPhotos(id: number): Observable<Photos[]> {
    const url = `${this.BASE_URL}/albums/${id}/photos`;
    return this.client.get<Photos[]>(url);
  }
  updateAlbum(album: Album): Observable<Album>{
    return this.client.put<Album>(`${this.BASE_URL}/albums/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/albums/${id}`);
  }
}
