import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'microsoft-login';

  constructor(private msalService: MsalService) {}

  ngOnInit() {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
          if (res != null && res.account != null) {
              this.msalService.instance.setActiveAccount(res.account);
          }
      }
    );
  }

  isLoggedIn() {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }
}
