import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppRatingComponent} from './app-rating.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        RouterModule.forChild([{path: '', component: AppRatingComponent}])
    ],
    declarations: [AppRatingComponent]
})
export class AppRatingModule {
}
