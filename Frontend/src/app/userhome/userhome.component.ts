import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  constructor(private _user:UserService, private _router:Router) {}

  ngOnInit() {
  }

  logout() {
    this._user.logout()
    .subscribe(
      data => {console.log(data);this._router.navigate(['/login'])},
      error => console.error(error)
    )
  }

}
