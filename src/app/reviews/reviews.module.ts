import {NgModule} from '@angular/core';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {ReviewComponent} from "./components/review/review.component";
import {ReviewListComponent} from "./components/review-list/review-list.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Store, StoreModule} from "@ngrx/store";
import * as fromReview from './index';
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [ReviewsComponent, ReviewComponent, ReviewListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([fromReview.ReviewEffects]),
    StoreModule.forFeature(fromReview.featureKey, fromReview.reducer)
  ],
  exports: [ReviewsComponent]
})
export class ReviewsModule {
}
