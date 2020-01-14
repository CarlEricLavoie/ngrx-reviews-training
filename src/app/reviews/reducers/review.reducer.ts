import {Review} from "../models/review";
import {Action, createReducer, createSelector, MemoizedSelector, on} from "@ngrx/store";
import * as ReviewActions from '../actions';

export const featureKey = 'review';

export interface State {
  reviews: Review[];
}

export interface AppState{
  [featureKey] : State
}

export const initialState: State = {
  reviews: []
};

const reviewReducer = createReducer<State>(
  initialState,
  on(ReviewActions.AddReview, (state, {rating}) => ({ ...state, reviews : state.reviews.concat({rating, id : Date.now()}) })),
  on(ReviewActions.RemoveReview, (state,{id}) => ({ ...state, reviews: state.reviews.filter(r => r.id !== id) })));

export function reducer(state: State | undefined, action: Action) {
  return reviewReducer(state, action);
}
