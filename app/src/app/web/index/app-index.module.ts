import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppIndexComponent} from './app-index.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        RouterModule.forChild([{path: '', component: AppIndexComponent}])
    ],
    exports: [
        AppIndexComponent
    ],
    declarations: [AppIndexComponent]
})
export class AppIndexModule {
}
