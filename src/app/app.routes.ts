import { Routes } from '@angular/router';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/gurds.auth';
import { notLeftRegister } from './core/guards/not-left-register.guard';
import path from 'path';
import { logInDashbordGuard } from './core/guards/log-in-dashbord.guard';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/layouts/auth/auth.component').then((c) => c.AuthComponent),
    title: 'auth',
    children: [
      { path: '', redirectTo: 'login', title: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('../app/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'login',
        pathMatch: 'full',
        data: { animation: 'login' },
      },
      {
        path: 'Register',
        loadComponent: () =>
          import('../app/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
        pathMatch: 'full',
        canDeactivate: [notLeftRegister],
        data: { animation: 'Register' },
      },
    ],
  },

  {
    path: 'user',
    loadComponent: () =>
      import('../app/layouts/user/user.component').then((c) => c.UserComponent),
    title: 'user',
    canActivate: [authGuard],
    data: { animation: 'user' },
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full',
      },
      {
        path: 'Home',
        loadComponent: () =>
          import('../app/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
        title: 'home',
        data: { animation: 'home' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../app/pages/product/product.component').then(
            (c) => c.ProductComponent
          ),
        title: 'products',
        data: { animation: 'products' },
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../app/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('../app/pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details',
        data: { animation: 'details' },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('../app/pages/category/category.component').then(
            (c) => c.CategoryComponent
          ),
        title: 'categories',
        data: { animation: 'categories' },
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('../app/pages/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
        title: 'payment',
        data: { animation: 'payment' },
      },
      {
        path: 'OrderProgress',
        loadComponent: () =>
          import('../app/pages/order-progress/order-progress.component').then(
            (c) => c.OrderProgressComponent
          ),
        title: 'Order Progress',
        data: { animation: 'Order Progress' },
      },
    ],
  },
  {
    path: 'dash',
    loadComponent: () =>
      import('../app/layouts/auth-dash/auth-dash.component').then(
        (c) => c.AuthDashComponent
      ),
    title: 'auth',
    data: { animation: 'dash' },
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'dashboard',
    canActivate: [logInDashbordGuard],
    data: { animation: 'dashboard' },

    children: [
      {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full',
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('../app/pages/dash-sales/dash-sales.component').then(
            (c) => c.DashSalesComponent
          ),
        title: 'sales',
        data: { animation: 'sales' },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../app/pages/users/users.component').then(
            (c) => c.UsersComponent
          ),
        title: 'users',
        data: { animation: 'users' },
      },

      {
        path: 'products',
        loadComponent: () =>
          import('../app/pages/dash-products/dash-products.component').then(
            (c) => c.DashProductsComponent
          ),
        title: 'products',
        data: { animation: 'products' },
      },
      {
        path: 'UpdateProduct/:id',
        loadComponent: () =>
          import(
            './pages/dash-Update-product/dash-Update-product.component'
          ).then((c) => c.DashUptadeProductComponent),
        title: 'UpdateProduct',
        data: { animation: 'UpdateProduct' },
      },
      {
        path: 'UploadProduct',
        loadComponent: () =>
          import(
            './pages/dash-upload-product/dash-upload-product.component'
          ).then((c) => c.DashUploadProductComponent),
        title: 'Upload Product',
        data: { animation: 'Upload Product' },
      },
      {
        path: 'OrderManagement',
        loadComponent: () =>
          import(
            '../app/pages/dash-order-management/dash-order-management.component'
          ).then((c) => c.DashOrderManagementComponent),
        title: 'Order management',
        data: { animation: 'Order management' },
      },
      {
        path: 'detailsUserOrder',
        loadComponent: () =>
          import(
            '../app/pages/dash-details-user-order/dash-details-user-order.component'
          ).then((c) => c.DashDetailsUserOrderComponent),
        title: 'details user order',
        data: { animation: 'Order management' },
      },
      {
        path: 'Delivery',
        loadComponent: () =>
          import('../app/pages/add-to-delivery/add-to-delivery.component').then(
            (c) => c.AddToDeliveryComponent
          ),
        title: 'Delivery',
        data: { animation: 'Delivery' },
      },
      {
        path: 'Received',
        loadComponent: () =>
          import('../app/pages/dash-received/dash-received.component').then(
            (c) => c.DashReceivedComponent
          ),
        title: 'Received',
        data: { animation: 'Received' },
      },
      {
        path: 'Undelivered',
        loadComponent: () =>
          import(
            '../app/pages/dash-undelivered/dash-undelivered.component'
          ).then((c) => c.DashUndeliveredComponent),
        title: 'Undelivered',
        data: { animation: 'Undelivered' },
      },
    ],
  },
];
