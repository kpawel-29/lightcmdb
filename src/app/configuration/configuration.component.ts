import {Component, OnInit} from '@angular/core';
import {Configuration} from '../model/Configuration';
import {ConfigurationService} from './configuration.service';

declare var $: any;

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnInit {

    public configurations: Configuration[] = [];
    public dto: Configuration = new Configuration();

    constructor(private configService: ConfigurationService) {
    }

    ngOnInit() {
        this.loadConfigurations();
    }

    loadConfigurations() {
        this.dto.name = '';
        this.dto.value = '';
        this.configService.getConfiguration()
            .subscribe(
                next => this.configurations = next,
                err => alert('błąd pobierania danych')
            );
    }

    openEditModal(config: Configuration) {
        this.dto.id = config.id;
        $('#edit-modal').modal('show', {});

    }

    openCreateModal() {
        $('#create-modal').modal('show', {});
    }

    createConfig() {
        this.configService.createConfiguration(this.dto)
            .subscribe(
                next => {
                    this.loadConfigurations();
                    alert('ok');
                },
                err => alert('błąd pobierania danych')
            );
    }

    editConfig() {
        this.configService.editConfiguration(this.dto)
            .subscribe(
                next => {
                    this.loadConfigurations();
                    alert('ok');
                },
                err => alert('błąd pobierania danych')
            );
    }

    deleteConfig(id: string) {
        this.configService.deleteConfiguration(id)
            .subscribe(
                next => {
                    this.loadConfigurations();
                    alert('ok');
                },
                err => alert('błąd pobierania danych')
            );
    }

}
