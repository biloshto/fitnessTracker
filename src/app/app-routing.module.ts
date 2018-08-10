import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "./auth/auth.guard";

// we're creating the routes first
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
  // to protect the /training route, we need to attach the auth.guard to the route in the routing setup
];

// then we need to export them so we can use our AppRoutingModule in our AppModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
  // for this routing thing to work, we need to provide the AuthGuard (because behind the scenes it's treated as a service, it's injected by Angular, even though we don’t inject it Angular does this for us); normally we would provide it in the AppModule, but here we'll provide it in the AppRoutingModule because it will still be available to the entire app but we only use it here in this section - this is a rare exception, we normally should provide services in the AppModule or directly in the component, but guards are fine to be provided in the RoutingModule
})
export class AppRoutingModule {}