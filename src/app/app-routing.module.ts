import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { authGuard } from './guards/auth/auth.guard';
import { ArmorListComponent } from './pages/armors/armor-list/armor-list.component';
import { ArmorDetailsComponent } from './pages/armors/armor-details/armor-details.component';
import { ErrorComponent } from './pages/error/error.component';
import { ArmorSetsTableComponent } from './pages/armors/armor-sets-table/armor-sets-table.component';
import { ArmorSetsDetailsComponent } from './pages/armors/armor-sets-details/armor-sets-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'armor'},
  { path: 'auth/signin', component: SigninComponent},

  { path: 'armor', canActivate: [authGuard], children: [
    { path: 'sets/:id', component: ArmorSetsDetailsComponent},
    { path: 'sets', component: ArmorSetsTableComponent},
    { path: ':id', component: ArmorDetailsComponent},
    { path: '', component: ArmorListComponent},
    ]
  },

  { path: 'not-found', component: ErrorComponent},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
