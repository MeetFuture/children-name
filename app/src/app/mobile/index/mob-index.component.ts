import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalService, ToastService} from 'ng-zorro-antd-mobile';

@Component({
    selector: 'my-mob-index',
    templateUrl: './mob-index.component.html',
    styleUrls: ['./mob-index.component.css']
})
export class MobIndexComponent {
    names = [];
    config = {xing: '', ming: '', sex: '', num: ''};
    loading = false;
    mingSelected = '不限';
    sexSelected = '不限';
    mingList = [{label: '不限', value: 'all'}, {label: '1', value: '1'}, {label: '2', value: '2'}];
    sexList = [{label: '不限', value: 'all'}, {label: '男性', value: 'nan'}, {label: '女性', value: 'nv'}];
    mingValue = [];
    sexValue = [];

    constructor(public http: HttpClient, private modalService: ModalService, private toastService: ToastService) {
        this.getConfig();
    }

    getConfig() {
        this.http.get<any>("/api/name/config").subscribe(data => {
            this.config = data;
            this.config.num = '20';
            this.mingSelected = !this.config.ming ? '不限' : this.config.ming;
            this.sexSelected = !this.config.sex ? '不限' : this.config.sex === 'nan' ? '男性' : this.config.sex === 'nv' ? '女性' : '';
            this.random();
        });
    }

    random() {
        if (!this.loading) {
            this.loading = true;
            this.names = [];
            let params = this.config;
            this.http.post<string[]>('/api/name/random', params).subscribe(data => {
                    data.forEach(value => {
                        const arr = Array.from(data).map((_val, i) => ({
                            text: _val
                        }));
                        this.names = arr;
                    });
                    this.loading = false;
                }
            );
        }
    }

    choose(event) {
        let currentTarget = (event.target as Element).parentElement;
        let className = currentTarget.className;
        if (className.indexOf('am-grid-item-inner-content') >= 0) {
            currentTarget = currentTarget.parentElement;
            className = currentTarget.className;
        }
        console.log("className:" + className);

        let isSelected = className.indexOf("selected") >= 0;
        if (isSelected) {
            className = className.replace("selected", "");
        } else {
            className = className + " selected";
        }
        currentTarget.setAttribute("class", className);

        let params = {name: currentTarget.textContent};

        this.http.post(isSelected ? '/api/name/del' : '/api/name/add', params).subscribe(data => {
                console.log("Name result:", data);
            }
        );
    }


    onChangeConfig(key: string, result) {
        console.log('onChangeConfig:', result);
        let selected = result[0];
        this[key + 'Selected'] = selected.label;
        this.config[key] = selected.value;
        console.log('Module value:', this.mingValue, this.sexValue);
    }

    handInputPrompt() {
        this.modalService.prompt(
            '输入名字',
            '',
            [
                {
                    text: '取消'
                },
                {
                    text: '提交',
                    onPress: value => this.handInputSubmit(value)

                }
            ],
            'default',
            null,
            ['请输入名字']
        );
    }

    handInputSubmit(handInput) {
        if (handInput) {
            let params = {name: handInput};
            this.http.post('/api/name/add', params).subscribe(data => {
                    console.log("Name result:", data);
                    this.toastService.info('保存成功 !', 1000);
                }
            );
        }
    }
}
