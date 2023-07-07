import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  myForm: FormGroup;
  error: null | undefined;

 
  constructor(public cartService : CartService, private router : Router, private formBuilder: FormBuilder, public apiService : ApiService, public jwtService : JwtService ){
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
        next: (data) => {localStorage.setItem('token', JSON.stringify(data))
                        const jwt = data['access-token']
                        console.log(this.jwtService.DecodeToken(jwt))},
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      })
      console.log(this.myForm.value);  
  }
  
}
