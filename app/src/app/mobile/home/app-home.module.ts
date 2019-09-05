import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppHomeComponent} from './app-home.component';
import {AppHomeRoutingModule} from './app-home.router.module';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MobIndexComponent} from '../index/mob-index.component';
import {MobRatingComponent} from '../rating/mob-rating.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        NgZorroAntdMobileModule,
        AppHomeRoutingModule
    ],
    declarations: [AppHomeComponent, MobIndexComponent, MobRatingComponent]
})
export class AppHomeModule {
}
