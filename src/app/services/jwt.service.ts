import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http : HttpClient) { }
  DecodeToken(token : string): string{

    return jwt_decode(token)

  }
  
}
