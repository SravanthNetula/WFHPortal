import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { EmpdataComponent } from './user/empdata/empdata.component';
import { DonelogoutComponent } from './donelogout/donelogout.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'empdata', component: UserComponent,
        children: [{ path: '', component: EmpdataComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'auth', component: AuthComponent,
    },
    {
        path: 'userprofile/:id', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'donelogout', component: DonelogoutComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'admindash', component: AdmindashboardComponent,
    },
];