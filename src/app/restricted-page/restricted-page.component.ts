import {Component, OnInit} from '@angular/core';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-restricted-page',
  imports: [],
  templateUrl: './restricted-page.component.html',
  styleUrl: './restricted-page.component.css'
})
export class RestrictedPageComponent implements OnInit {

  constructor(private msalService: MsalService) { }

  ngOnInit() {
  }

  getNames() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    return activeAccount ? activeAccount.name : 'No active account';
  }

}
