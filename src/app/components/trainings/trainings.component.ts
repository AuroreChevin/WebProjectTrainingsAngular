import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit{
  listTrainings : Training[] =[];
  listCategories : Category[]=[];
  error : string | undefined;
  currentTraining : any;
  editPhoto : boolean | undefined;
  currentFileUpload : any;
  selectedFiles : any;
  host : string = "";
  page =1;
  size=5;
  totalPages:Array<number> | undefined;
  constructor(private cartService : CartService, private apiService: ApiService,
    private router : Router, public authService : AuthenticationService) { }
  ngOnInit(): void{
    this.host = environment.host;
    this.getAllTrainings();
    this.getAllCategories();
  }
  getAllTrainings(){
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = "Pb de chargement"),
      complete: () => (this.error = ""),
    });
  }
  getAllCategories(){
    this.apiService.getCategories().subscribe({
      next: (data) => (this.listCategories = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = ""),
    })
  }
  getTrainingsByCatId(id: number){
    this.apiService.getTrainingsByCategoryId(id).subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = ""),
    })
  }
  onAddToCart(training:Training){
    if(training.quantity > 0){
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
    }
  }
  deleteTraining(training : Training){
      this.apiService.delTraining(training).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.getAllTrainings()),
      });
  }
  updateTraining(training :Training){
    this.router.navigateByUrl('training');
  }
  onEditPhoto(training: Training){
    this.currentTraining = training;
    this.editPhoto = true;
  }
  onSelectedFile(event:any){
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
  }
  onUploadPhoto(){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.apiService.postPhoto(this.currentFileUpload,this.currentTraining.id).subscribe({
      next : (data) =>console.log(data),
      error : (err)=> this.error = "problème de chargement",
      complete : () => this.error = ""
    });
  }
}
