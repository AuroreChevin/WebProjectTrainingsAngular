import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { OrderComponent } from './order/order.component';
import { TrainingComponent } from './components/training/training.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthenticationGuard } from './components/authentication/authentication.guard';
const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent },
  {path : 'cart', component : CartComponent },
  {path : 'formular', component : CustomerComponent},
  {path : 'order', component: OrderComponent},
  {path : 'Authentication', component : AuthenticationComponent},
  {path : 'training', component : TrainingComponent},
  {path : 'admin', component : AdminComponent,
  canActivate : [AuthenticationGuard]},
  {path : '', redirectTo : 'trainings', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
