import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginresponseDto} from "./loginresponse-dto";
import {UserDataDto} from "./userdata-dto";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  loginUser(username: string, password: string){
    const url = `http://localhost:8080/api/users/login?username=${username}&password=${password}`;
    return this.httpClient.post<LoginresponseDto>(url, null);
  }

  registerUser(username: string, email: string, password: string, role: string){
    const url = `http://localhost:8080/api/users/register?username=${username}&email=${email}&password=${password}&role=${role}`;
    return this.httpClient.post<Boolean>(url, null);
  }

  fetchallUsers(){
    const url='http://localhost:8080/api/users/all';
    return this.httpClient.get<Array<UserDataDto>>(url);

  }

  deleteUser(userId: number) {
    const url = `http://localhost:8080/api/users/deleteUser?uid=${userId}`;
    return this.httpClient.delete<JSON>(url);
  }

}
