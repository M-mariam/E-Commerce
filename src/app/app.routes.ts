import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AddressComponent } from './components/address/address.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfountComponent } from './components/notfount/notfount.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { isloginGuard } from './core/guards/islogin.guard';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';

export const routes: Routes = [
    {path: '',component:AuthLayoutComponent,canActivate: [isloginGuard], children:[
        {path: '', redirectTo:'login', pathMatch: 'full'},
        {path:'login', component:LoginComponent, title: 'Login'},
        {path:'register', component:RegisterComponent, title: 'Register'},
        {path:'forgetPassword', component:ForgetPasswordComponent, title: 'Forget Password'},

    ]},

    {path: '',component:MainLayoutComponent, canActivate: [authGuard], children:[
        {path: '', redirectTo:'home', pathMatch: 'full'},
        {path: 'home', component:HomeComponent, title: 'Home', canActivate: [authGuard]},
        {path: 'cart', component:CartComponent , title: 'Cart', canActivate: [authGuard]},
        {path: 'products', component:ProductsComponent, title: 'Products',canActivate: [authGuard]},
        {path: 'brands', component:BrandsComponent, title: 'Brands',canActivate: [authGuard]},
        {path: 'product_details/:id', component:ProductDetailsComponent, title: 'Product Details', canActivate: [authGuard]},
        {path: 'categories', component:CategoriesComponent, title: 'Categories', canActivate: [authGuard]},
        {path: 'wishlist', component:WishlistComponent, title: 'WishList', canActivate: [authGuard]},
        {path: 'address/:id', component:AddressComponent, title: 'Address', canActivate: [authGuard]},
    ]},
    {path: '**',component:NotfountComponent, title: 'Not Found'},
];

