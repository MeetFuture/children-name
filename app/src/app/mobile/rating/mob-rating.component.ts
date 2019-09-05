import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'my-mob-rating',
    templateUrl: './mob-rating.component.html',
    styleUrls: ['./mob-rating.component.css']
})
export class MobRatingComponent {
    datas: any[] = [];
    loading: boolean = false;
    saving;


    constructor(public http: HttpClient, private modalService: ModalService, private toastService: ToastService) {
        console.log('AppRatingComponent constructor ');
        this.init();
    }


    init() {
        this.loading = true;
        this.datas = [];
        this.http.post<any[]>("/api/name/all", {}).subscribe(data => {
            // 有信息的默认展开
            // data.forEach(value => {
            //     if (value.desc) {
            //         value.showDesc = true;
            //     }
            // });
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

    removeName(index: number, name: string) {
        this.modalService.alert('删除', '确定要删除 [' + name + '] 吗?', [
            {text: '取消'},
            {text: '确认', onPress: () => this.removeNameDo(index)}
        ]);
    }

    removeNameDo(index: number) {
        let arr = this.datas.splice(index, 1);
        let params = {id: arr[0].id};
        this.http.post('/api/name/del', params).subscribe(data => {
                console.log("Name del result:", data);
                this.toastService.info('删除成功 !', 1000);
            }
        );
    }
}
