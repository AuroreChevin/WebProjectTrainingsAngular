import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  myForm!: FormGroup;
  
  constructor(public cartService : CartService, private router : Router, private formBuilder: FormBuilder){}  
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
      password : ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    })
  }
  login(myForm: FormGroup){

  }
}
