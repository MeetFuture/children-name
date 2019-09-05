import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private router: Router) {
        let mobile = this.isMobile();
        this.router.navigateByUrl(mobile ? "/home" : '/index');
    }

    isMobile() {
        const userAgentInfo = navigator.userAgent;
        console.log("userAgentInfo:", userAgentInfo);
        const flag = /Android|iPhone|iPad|iPod|SymbianOS|Windows Phone|webOS|BlackBerry/i.test(userAgentInfo);
        return flag;
    }

}
