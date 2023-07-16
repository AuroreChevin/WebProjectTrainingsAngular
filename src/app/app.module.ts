import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { OrderComponent } from './order/order.component';
import { TrainingComponent } from './components/training/training.component';
import { AuthenticationService } from './services/authentication.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthInterceptor } from './components/authentication/authInterceptor';
import { AuthenticationGuard } from './components/authentication/authentication.guard';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CartComponent,
    NotFoundComponent,
    CustomerComponent,
    AuthenticationComponent,
    OrderComponent,
    TrainingComponent,
    AdminComponent,
    RegisterComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    
  {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
