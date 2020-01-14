//selectors
//feature selector
import {createSelector} from "@ngrx/store";
import * as fromReview from "../reducers/review.reducer";

export const selectFeature = (state : fromReview.AppState) => state[fromReview.featureKey];

//actual selectors
export const selectReviews = createSelector(selectFeature, (state : fromReview.State) => state.reviews);
