import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private dataService: DataService) { }

    get list() {
        return this.dataService.list;
    }

    get talks() {
        return this.dataService.talks;
    }

}
