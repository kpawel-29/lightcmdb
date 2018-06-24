import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {NgCytoscapeComponent} from 'ng2-cytoscape/dist/ng2-cytoscape';
import {TreeModule} from 'ng2-tree';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app.routing';
import {AuthGuard} from './auth/auth.guard';
import {AuthenticationService} from './auth/authentication.service';
import {LoginComponent} from './auth/login/login.component';

import {CiTypeManagerComponent} from './ci-type-manager/ci-type-manager.component';
import {CiTypeService} from './ci-type-manager/ci-type.service';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarService} from './components/sidebar/sidebar.service';
import {ConfigurationComponent} from './configuration/configuration.component';
import {ConfigurationService} from './configuration/configuration.service';
import {DiscoveryComponent} from './discovery/discovery.component';
import {DiscoveryService} from './discovery/discovery.service';
import {IprangeComponent} from './discovery/iprange/iprange.component';
import {JobComponent} from './discovery/job/job.component';
import {MappingComponent} from './discovery/mapping/mapping.component';
import {ProbeComponent} from './discovery/probe/probe.component';
import {SchedulerComponent} from './discovery/scheduler/scheduler.component';
import {TaskComponent} from './discovery/task/task.component';
import {CiFormComponent} from './form/ci-form/ci-form.component';
import {IprangeFormComponent} from './form/iprange-form/iprange-form.component';
import {MappingFormComponent} from './form/mapping-form/mapping-form.component';
import {InfrastructureSettingsComponent} from './infrastructure-settings/infrastructure-settings.component';
import {ItUniverseManagerComponent} from './it-universe-manager/it-universe-manager.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RelationsComponent} from './relations/relations.component';
import {SearchComponent} from './search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        CiTypeManagerComponent,
        ItUniverseManagerComponent,
        InfrastructureSettingsComponent,
        DiscoveryComponent,
        RelationsComponent,
        SidebarComponent,
        FooterComponent,
        LoginComponent,
        NavbarComponent,
        SearchComponent,
        NgCytoscapeComponent,
        CiFormComponent,
        MappingComponent,
        JobComponent,
        SchedulerComponent,
        TaskComponent,
        MappingFormComponent,
        ProbeComponent,
        IprangeFormComponent,
        ConfigurationComponent,
        IprangeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppRoutingModule,
        AngularMultiSelectModule,
        TreeModule
    ],
    providers: [
        SidebarService,
        AuthenticationService,
        AuthGuard,
        CiTypeService,
        DiscoveryService,
        ConfigurationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
