import { Data } from "@angular/router";

export interface Member {
    id: string;
    name: string;
    type: 'Producer' | 'Consumer';
    category: string;
  }
  
  export interface BalancingCircle {
    id: string;
    name: string;
    members: Member[];
  }

  export interface MemberData{
   memberId: string,
  forecast: [
    {
      date: Date,
      value: number
    }
  ]

  }