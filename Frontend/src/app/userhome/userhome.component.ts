import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  constructor(private _user:UserService, private _router:Router, private crud:CrudService) {
    
  }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    this.crud.getAllUsers().subscribe(users => console.log(users));
  }

  logout() {
    this._user.logout()
    .subscribe(
      data => {console.log(data);this._router.navigate(['/login'])},
      error => console.error(error)
    )
  }

}
