import axios from 'axios';
import { Injectable } from '@angular/core';
import { MemberData } from '../models/member-forecast';

@Injectable({
  providedIn: 'root',
})
export class InbalanceService {
  private apiUrl = 'http://localhost:5295/api/v1/balancing';
  private apiUrl2 = 'http://localhost:5295/api/v1/balancing/member';


  constructor() {}

  getBalancingCircles(): Promise<any> {
    return axios.get(`${this.apiUrl}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener los círculos de balance:', error);
        return undefined;
      });
  }
  getBalancingMembersData(memberId: string): Promise<MemberData | undefined> {
    return axios.get<MemberData>(`${this.apiUrl2}/${memberId}/forecast`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos del miembro:', error);
        return undefined; // Manejar el error de manera apropiada
      });
  }

}