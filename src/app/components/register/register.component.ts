import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role.model';
import { UserRoleForm } from 'src/app/model/user-role-form.model';
import { User } from 'src/app/model/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  myForm : FormGroup;
  error: any;
  user : User | undefined;
  users : User[] | undefined
  roles: Role[] | undefined;
  userRoleForm : UserRoleForm | undefined;
  succeed : boolean | undefined
  constructor(private formBuilder : FormBuilder, private apiService : ApiService){
    this.myForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
      roles : ['', Validators.required]
    },  {validators : this.mustMatch('password', 'confirmPassword')})
  }
  ngOnInit(): void {
    this.apiService.getRoles().subscribe({
      next: (data) => {this.roles = data;
      console.log(this.roles)},
      error: (err) => this.error = err.message,
      complete: () => this.error = null,
    })
    this.apiService.getUsers().subscribe({
      next: (data) => {this.users = data;
      console.log(this.users)},
      error: (err) => this.error = err.message,
      complete: () => this.error = null,
    })
  }
  
  register(){
    if(this.myForm.valid){
      this.user = new User(0, this.myForm.value.username, this.myForm.value.password, []);
      this.apiService.saveUser(this.user).subscribe({
        next: (data) =>{ (console.log(data));
        this.addRoleToUser(this.myForm)},
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      })
    }
    else{
this.error = "Vous n'avez pas saisi correctement les champs";
    }
  }
  addRoleToUser(myForm : FormGroup){
    this.userRoleForm = new UserRoleForm(this.myForm.value.username, this.myForm.value.roles)
      this.apiService.postRoleUser(this.userRoleForm).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      })
      console.log(this.userRoleForm);
      alert('cool')
  }

  mustMatch(firstControl: string, secondControl : string): ValidatorFn {
    return (ctrl : AbstractControl): ValidationErrors | null => {
      const formGroup = ctrl as FormGroup
      const firstControlValue = formGroup.get(firstControl)?.value;
      const secondControlValue = formGroup.get(secondControl)?.value;
      if(firstControlValue === secondControlValue){
        return null;
      } else {
        return {valuesNotMatch : true}
      }
    }
  }

}


