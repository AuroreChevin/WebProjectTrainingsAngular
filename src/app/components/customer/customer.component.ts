import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  myForm!: FormGroup;
  customer! : Customer;
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
      email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })
  }
  onSaveCustomer(){
    
    if(this.myForm.valid){
      this.cartService.saveCustomer(new Customer(this.myForm.value.name,this.myForm.value.firstname, this.myForm.value.address,this.myForm.value.phone, this.myForm.value.email));
      this.router.navigateByUrl('order');
      alert("ok");
    }
    else{
      this.router.navigateByUrl('cart');
    }
  }
  okCustomer(){
    console.log(localStorage.getItem('customer'));
  }
}
