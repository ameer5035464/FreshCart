import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { DetailsComponent } from './components/details/details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetNumberComponent } from './components/reset-number/reset-number.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {path:'' , 
  canActivate:[authGuardGuard] ,
  component:BlankLayoutComponent , children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'cart' , component:CartComponent},
    {path:'products' , component:ProductsComponent},
    {path:'allorders' , component:AllordersComponent},
    {path:'details/:id' , component:DetailsComponent},
    {path:'categories' , component:CategoriesComponent},
    {path:'brands' , component:BrandsComponent}
  ]},
  {path:'' , component:AuthLayoutComponent , children:[
    {path:'register' , component:RegisterComponent},
    {path:'login' , component:LoginComponent},
    {path:'forgetPassword' , component:ForgetPasswordComponent},
    {path:'resetCode' , component:ResetNumberComponent},
    {path:'resetPassword' , component:ResetPasswordComponent},
  ]},
  {path:'**' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
