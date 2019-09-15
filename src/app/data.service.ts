import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Talk } from './talk';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    talks: { [code: string]: Talk } = {};
    list: string[] = [];

    constructor(private http: HttpClient) {
        this.http.get(`https://www.endsummercamp.org/index.php/ESC19-Schedule`, {responseType: 'text'}).toPromise().then((data) => {
            let parser = new DOMParser();
            let html = parser.parseFromString(data, 'text/html');

            let elements = html.getElementById("mw-content-text").querySelectorAll("h1, h1 ~ table");

            let current = null;
            elements.forEach((node) => {
                if (node.tagName.toLowerCase() === 'h1') {
                    current = node.textContent.trim();
                }
                if (node.tagName.toLowerCase() === 'table' && current) {
                    node.querySelectorAll('tr+tr').forEach((row) => {
                        let cells = row.querySelectorAll('td');
                        let code = cells[0].textContent.trim();
                        if (code.indexOf('-') >= 0 || !parseInt(code.substr(3))) {
                            return;
                        }
                        let talk = new Talk({
                            code: code,
                            title: cells[2].textContent.trim(),
                            speaker: cells[3].textContent.trim(),
                            date: current,
                            time: cells[1].textContent.trim(),
                        });

                        this.talks[code] = talk;
                        this.list.push(code);
                    });
                }
            });
        });
    }
}
