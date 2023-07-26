import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  myForm: FormGroup;
  error: null | undefined;
 
  constructor(public cartService : CartService,
              private router : Router,
              private formBuilder: FormBuilder,
              public apiService : ApiService,
              public authService : AuthenticationService,
              public jwtService : JwtService ){
    this.myForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    })
  }  
  ngOnInit(): void {
  }
  login(){
    if(this.myForm.invalid){return;}
    this.apiService.postUser(this.myForm.value.username, this.myForm.value.password).subscribe( {
        next: (data) => {console.log(data);
          this.authService.setToken(data['access-token']);
                        const jwt = data['access-token'];
                        let decodedToken = this.jwtService.DecodeToken(jwt);
                        console.log(decodedToken);
                      this.authService.setRoles(data.roles)},
                        
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      })
      console.log(this.myForm.value);  
  }
  
}
