import { Injectable } from '@angular/core';
import {request} from "../api";

export type Token = {
  value: string,
  expiration: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiTokenService {

  private AUTH_ENDPOINT =
      "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
  private TOKEN_KEY = "whos-who-access-token";
  private _token: Token | undefined;

  constructor() {
    this.token;
  }

  get token(): Promise<Token> {
    const storedTokenString = localStorage.getItem(this.TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this._token = storedToken;
        return Promise.resolve(this._token!);
      }
    }
    console.log("Sending request to AWS endpoint");

    return request(this.AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(newToken));
      this._token = newToken.value;

      return newToken.value;
    });
  }
}
