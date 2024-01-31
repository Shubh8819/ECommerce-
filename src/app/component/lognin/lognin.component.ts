import { Component, Inject, OnInit, inject } from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';

import MyAppConfig from '../../config/my-config';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
@Component({
  selector: 'app-lognin',
  templateUrl: './lognin.component.html',
  styleUrls: ['./lognin.component.css']
})

export class LogninComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: MyAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: MyAppConfig.oidc.clientId,
      redirectUri: MyAppConfig.oidc.redirectUri,
      authParams: {
        pkce: false,
        issuer: MyAppConfig.oidc.issuer,
        scopes: MyAppConfig.oidc.scopes
        
      }
    });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }

}