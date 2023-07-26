import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{
  id: any;
  error: null | undefined;
  training!: Training;
  myForm!: FormGroup;
  constructor(public apiService : ApiService, public router : Router, private formBuilder: FormBuilder){
   //this.training = new Training(0,"","",0,1);
   this.myForm = this.formBuilder.group({
    id : [0, Validators.required],
    name : ['', Validators.required],
    description : ['', Validators.required],
    price : ['', Validators.required]
  })
  }
  ngOnInit(): void {
   /* this.id = this.router.snapshot.paramMap.get('id');
        console.log(this.id);*/
  }
  onSaveTraining(myForm : FormGroup){
    if(myForm.valid){
      this.apiService.postTraining({name:myForm.value.name , description:myForm.value.description 
        , price:myForm.value.price, quantity : 1}).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
    console.log(this.myForm.value)
  }
}