import {Action, createAction, props} from "@ngrx/store";

// export class AddReview implements Action{
//   type: string = '[Review] Add Review';
//   constructor(public rating : number) {
//   }
// }

export const AddReview  = createAction("[Review] Add Review", props<{rating : number}>());
export const RemoveReview = createAction("[Review] Remove Review", props<{id : number}>());
