import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {CiTypeManagerComponent} from './ci-type-manager/ci-type-manager.component';
import {RelationsComponent} from './relations/relations.component';
import {InfrastructureSettingsComponent} from './infrastructure-settings/infrastructure-settings.component';
import {DiscoveryComponent} from './discovery/discovery.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
    {path: '', redirectTo: 'discovery', pathMatch: 'full'},
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'ci-type-manager',
        component: CiTypeManagerComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'relations',
        component: RelationsComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'infrastructure-settings',
        component: InfrastructureSettingsComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'discovery',
        component: DiscoveryComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [],
})
export class AppRoutingModule {
}
