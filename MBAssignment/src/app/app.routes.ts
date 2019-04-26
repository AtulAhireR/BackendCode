import {Routes, RouterModule} from '@angular/router'
import { ManagerComponent } from './components/manager/manager.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
//import { AuthGuard } from './guards/always-auth.guard';



const appRoutes: Routes =[
{
    path:'',
    component:LoginComponent
},
{
    path:'home',
    canActivate: [AuthGuard],
    component:ManagerComponent
}
];

export const AppRoutes = RouterModule.forRoot(appRoutes);