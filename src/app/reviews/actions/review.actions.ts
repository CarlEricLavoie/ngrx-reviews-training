import {Action, createAction, props} from "@ngrx/store";
import {Review} from "..";

// export class AddReview implements Action{
//   type: string = '[Review] Add Review';
//   constructor(public rating : number) {
//   }
// }

export const AddReview  = createAction("[Review] Add Review", props<{rating : number}>());
export const RemoveReview = createAction("[Review] Remove Review", props<{id : number}>());
export const LoadReviews = createAction("[Review] Load Review");
export const LoadReviewsSuccessful = createAction("[Review] Load Review Successful", props<{reviews : Review[]}>());
export const AddReviewSuccessful = createAction("[Review] Add Review Successful", props<Review>());
export const RemoveReviewSuccessful = createAction("[Review] Remove Review Successful", props<{id : number}>());
