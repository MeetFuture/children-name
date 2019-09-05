import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'my-app-rating',
    templateUrl: './app-rating.component.html',
    styleUrls: ['./app-rating.component.css']
})
export class AppRatingComponent {
    datas: any[] = [];
    loading: boolean = false;
    saving;

    constructor(public http: HttpClient, private sanitizer: DomSanitizer) {
        this.init();
    }

    init() {
        this.loading = true;
        this.http.post<any[]>("/api/name/all", {}).subscribe(data => {
            this.datas = data;
            this.loading = false;
        });
    }

    saveChange(index: number) {
        if (this.saving != null) {
            clearTimeout(this.saving);
        }
        this.saving = setTimeout(his => {
            let params = this.datas[index];
            this.http.post<any>("/api/name/save", params).subscribe(data => {
                console.log("Name save result:", data);
            });
        }, 500);
    }

    removeName(index: number) {
        let arr = this.datas.splice(index, 1);
        let params = {id: arr[0].id};
        this.http.post('/api/name/del', params).subscribe(data => {
                console.log("Name del result:", data);
            }
        );
    }

    download() {
        let text = "";
        this.datas.forEach(value => {
            return text += JSON.stringify(value) + "\n";
        });
        const blob = new Blob([text], {type: 'application/octet-stream'});
        let objectURL = window.URL.createObjectURL(blob);
        let fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
        const link = document.createElement('a');
        link.href = objectURL;
        link.download = "names.txt";
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        setTimeout(function () {
            window.URL.revokeObjectURL(objectURL);
        }, 100);
    }
}
