import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { OrderComponent } from './components/order/order.component';
import { TrainingComponent } from './components/training/training.component';
import { RegisterComponent } from './components/register/register.component';
import { UserGuard } from './components/user.guard';
const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent },
  {path : 'cart', component : CartComponent },
  {path : 'formular', component : CustomerComponent, 
    canActivate : [UserGuard]},
  {path : 'order', component: OrderComponent, 
  canActivate : [UserGuard]},
  {path : 'Authentication', component : AuthenticationComponent},
  {path : 'training', component : TrainingComponent},
  {path : 'register', component : RegisterComponent},
  {path : '', redirectTo : 'trainings', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
