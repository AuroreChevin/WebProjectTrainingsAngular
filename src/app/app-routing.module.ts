import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationComponent } from './authentication/authentication.component';
const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent },
  {path : 'cart', component : CartComponent },
  {path : 'order', component : CustomerComponent},
  {path : 'Authentication', component : AuthenticationComponent},
  {path : '', redirectTo : 'trainings', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
