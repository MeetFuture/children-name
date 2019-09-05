import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'my-app-index',
    templateUrl: './app-index.component.html',
    styleUrls: ['./app-index.component.css']
})
export class AppIndexComponent {
    names: string[] = [];
    handInput: string = "";
    config = {xing: '', ming: '', sex: '', num: ''};
    loading = false;

    constructor(public http: HttpClient) {
        this.getConfig();
    }

    getConfig() {
        this.http.get<any>("/api/name/config").subscribe(data => {
            this.config = data;
            this.random();
        });
    }

    random() {
        if (!this.loading) {
            this.loading = true;
            let params = this.config;
            this.http.post<string[]>('/api/name/random', params).subscribe(data => {
                    this.names = data;
                    this.loading = false;
                }
            );
        }
    }

    choose(event: MouseEvent) {
        let currentTarget = event.currentTarget as Element;
        let className = currentTarget.className;
        console.log("className:" + className);
        let isSelected = className.indexOf("selected") >= 0;
        if (isSelected) {
            className = className.replace("selected", "");
        } else {
            className = className + " selected";
        }
        currentTarget.removeAttribute("class");
        currentTarget.setAttribute("class", className);

        let params = {name: currentTarget.textContent};
        this.http.post(isSelected ? '/api/name/del' : '/api/name/add', params).subscribe(data => {
                console.log("Name result:", data);
            }
        );
    }


    handInputSubmit() {
        if (this.handInput) {
            let params = {name: this.handInput};
            this.http.post('/api/name/add', params).subscribe(data => {
                    console.log("Name result:", data);
                    this.handInput = "";
                }
            );
        }
    }

}
