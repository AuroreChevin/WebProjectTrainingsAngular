import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{
  id: any;
  error : string | undefined;
  training: Training | undefined;
  category : Category | undefined;
  myForm!: FormGroup;
  listCategories : Category[]=[];
  constructor(public apiService : ApiService, public router : Router, private formBuilder: FormBuilder){
   //this.training = new Training(0,"","",0,1);
   this.myForm = this.formBuilder.group({
    id : [0, Validators.required],
    name : ['', Validators.required],
    description : ['', Validators.required],
    price : ['', Validators.required],
    category : ['', Validators.required]
  })
  }
  ngOnInit(): void {
   /* this.id = this.router.snapshot.paramMap.get('id');
        console.log(this.id);*/
        this.getAllCategories();
  }
  getAllCategories(){
    this.apiService.getCategories().subscribe({
      next: (data) => (this.listCategories = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = ""),
    })
  }
  onSaveTraining(myForm : FormGroup){
    if(myForm.valid){
      this.category = new Category(myForm.value.category.id, myForm.value.category.name)
      this.training = new Training(myForm.value.id,myForm.value.name ,myForm.value.description 
        ,myForm.value.price, 1, this.category)
      this.apiService.postTraining(this.training).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = ""),
      });
    }
    console.log(this.myForm.value)
  }
}