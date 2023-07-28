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
  error : string | undefined;
 
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
  login(myForm: FormGroup){
    if(myForm.valid){
    this.authService.postUser(myForm.value.username, myForm.value.password).subscribe( {
        next: (data) => {console.log(data);
                        let jwt = data.headers.get('Authorization');
                        console.log(jwt);
                        this.authService.saveToken(jwt);
                        },
                        
        error: (err) => (this.error = "pb"),
        complete: () => (this.error = "null"),
      })
      console.log(myForm.value);
      this.router.navigateByUrl('trainings');
    } 
  }
  
}
