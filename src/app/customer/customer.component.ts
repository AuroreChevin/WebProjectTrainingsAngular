import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  myForm!: FormGroup;
  constructor(public cartService : CartService, private router : Router, private formBuilder: FormBuilder){ 
    /*let customer = this.cartService.getCustomer();
    this.myForm = new FormGroup({
      name : new FormControl(customer.name)
    })*/
  }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name : ['', Validators.required],
      firstname : ['', Validators.required],
      address : ['', [Validators.required, Validators.minLength(25)]],
      phone : ['', [Validators.required, Validators.maxLength(10)]],
      email : ['', [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
    })
  }
  onSaveCustomer(form : FormGroup){
    if(form.valid){
      this.cartService.saveCustomer(new Customer(form.value.name,form.value.firstname, form.value.address,form.value.phone, form.value.email));
      this.router.navigateByUrl('order');
    }
  }
}
