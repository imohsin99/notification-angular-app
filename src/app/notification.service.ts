import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SupervisorDTO} from "./SupervisorDTO";
import {NotificationDTO} from "./NotificationDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllSupervisors(): Observable<SupervisorDTO[]> {
    return this.http.get<SupervisorDTO[]>(`${this.baseUrl}/supervisors`);
  }

  createNotification(notification: NotificationDTO): Observable<NotificationDTO> {
    return this.http.post<NotificationDTO>(`${this.baseUrl}/submit`, notification);
  }
}
