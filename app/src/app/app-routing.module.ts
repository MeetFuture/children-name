import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {path: 'index', loadChildren: './web/index/app-index.module#AppIndexModule'},
    {path: 'rating', loadChildren: './web/rating/app-rating.module#AppRatingModule'},
    {path: 'home', loadChildren: './mobile/home/app-home.module#AppHomeModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
