import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "../models/user";
import { environment } from "../../../environments/environment";
import { LoginStrategy } from "../utils/login-strategy.enum";
import { Bearer } from "../utils/bearer";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CustomerService {

    constructor(public http: HttpClient) {
    }

    private basePath = environment.basePath;
    _user: BehaviorSubject<User> = new BehaviorSubject(null);
    user: Observable<User> = this._user.asObservable();
    _isCustomerLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isCustomerLogged: Observable<boolean> = this._isCustomerLogged.asObservable();

    register(data: User) {
        return this.http.post(`${this.basePath}/customers`, data)
            .pipe(
                map(this.handleServerLoginResponse.bind(this)),
                // catchError() - obrobleno w interceptori dla danych stezok abo bude obrobleno w componenti
            );
    }

    login(data: User | {access_token: string}, loginStrategy: LoginStrategy) {
        if (loginStrategy === LoginStrategy.Regular) {
            return this.http.post(`${this.basePath}/customers/login`, data)
                .pipe(
                    map(this.handleServerLoginResponse.bind(this)),
                );
        } else if (loginStrategy === LoginStrategy.Facebook) {
            return this.http.post(`${this.basePath}/customers/facebook`, data)
                .pipe(
                    map(this.handleServerLoginResponse.bind(this)),
                );
        }
    }

    logout() {
        this._isCustomerLogged.next(false);
        this._user.next(null);
        Bearer.deleteTokenFromStorage();
    }

    // moze nie byc tokena/wygasniety - mozna dac snackbara(powiadomienie) ale to zbedne
    getUserByToken() {
        return this.http.get(`${this.basePath}/customer`)
            .pipe(
                map((customerData: { name: string, email: string }) => {
                    const user = {
                        name: customerData.name,
                        email: customerData.email
                    };
                    this._user.next(user);
                    this._isCustomerLogged.next(true);
                }),
            );
    }

    // w interceptor ne treba bo usaju tilky tut w servisi dla usera
    handleServerLoginResponse(customerData) {
        Bearer.writeTokenToLocalStorage(customerData.accessToken);

        const user = {
            name: customerData.customer.name,
            email: customerData.customer.email
        };
        this._user.next(user);
        this._isCustomerLogged.next(true);
        return user;
    }

}
