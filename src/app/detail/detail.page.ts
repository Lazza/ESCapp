import { Component, OnInit } from '@angular/core';
import { Talk } from '../talk';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    code: string;
    sub: any;

    constructor(private route: ActivatedRoute, private dataService: DataService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.code = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    get talk() {
        return this.dataService.talks[this.code] || null;
    }
}
