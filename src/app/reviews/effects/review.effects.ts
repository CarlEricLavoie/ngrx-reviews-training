import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromReview from '../actions';
import {map, mergeMap} from "rxjs/operators";
import {ReviewService} from "../services/review.service";

@Injectable()
export class ReviewEffects {
  constructor(private actions$: Actions, private reviewService: ReviewService) {
  }

  loadReviews$ = createEffect(() => this.actions$.pipe(
    ofType(fromReview.LoadReviews),
    mergeMap(() => this.reviewService.fetchReviews()
      .pipe(
        map(reviews => fromReview.LoadReviewsSuccessful({reviews}))
      )
    )
  ))

  removeReview$ = createEffect(() => this.actions$.pipe(
    ofType(fromReview.RemoveReview),
    map(action => action.id),
    mergeMap((id) => this.reviewService.removeReview(id)
      .pipe(
        map(() => fromReview.RemoveReviewSuccessful({id}))
      )
    )
  ))

  addReview$ = createEffect(() => this.actions$.pipe(
    ofType(fromReview.AddReview),
    mergeMap((review) => this.reviewService.addReview( review.rating)
      .pipe(
        map(() => fromReview.AddReviewSuccessful({id : Date.now(), rating : review.rating}))
      )
    )
  ))
}
