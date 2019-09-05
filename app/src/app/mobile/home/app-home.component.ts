import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MobIndexComponent} from '../index/mob-index.component';
import {MobRatingComponent} from '../rating/mob-rating.component';

@Component({
    selector: 'my-app-home',
    templateUrl: './app-home.component.html',
    styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent {

    selectedIndex: number = 0;

    @ViewChild('index')
    index: MobIndexComponent;
    @ViewChild('rating')
    rating: MobRatingComponent ;

    constructor(public http: HttpClient) {
    }

    tabBarTabOnPress(pressParam: any) {
        console.log('onPress Params: ', pressParam);
        this.selectedIndex = pressParam.index;
        if (this.selectedIndex === 0){
            this.index.random();
        }else{
            this.rating.init();
        }
    }
}
