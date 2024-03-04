import { Observable } from "rxjs";
import { LoggedModelResponse, LoginModelRequest, registrationModelRequest } from "../models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { PanelService } from ".";
import { Router } from "@angular/router";



export class UserService{

    baseUrl = environment.apiUrl;

    constructor(
        private http : HttpClient,
        private dialog : MatDialog,
        private panelService : PanelService,
        private router : Router
    ){}

    login(payload:LoginModelRequest):Observable<LoggedModelResponse>{
        return this.http.post<LoggedModelResponse>(this.baseUrl + "/user/login", payload);
    }

    registration(payload:registrationModelRequest):Observable<LoggedModelResponse>{
        return this.http.post<LoggedModelResponse>(this.baseUrl + "/user/registration", payload);
    }

    logout():void{
        this.clearStorage();
    }

    clearStorage():void{
        localStorage.clear();
        sessionStorage.clear();
    }

    goToLogin(): void {
        this.dialog.closeAll();
        if (this.panelService.componentRef) {
          this.panelService.close();
        }
        if (this.panelService.parentComponentRef) {
          this.panelService.parentComponentRef.instance.closeDialog();
        }
        this.router.navigateByUrl("/login/login");
      }

    
}