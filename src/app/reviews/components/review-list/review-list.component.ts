import {Component, OnInit} from '@angular/core';
import {Review} from "../../models/review";
import {Observable} from "rxjs";
import * as fromReview from "../..";
import {AppState} from "../../reducers/review.reducer";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public $reviews : Observable<Review[]>;

  constructor(private store : Store<AppState>) {

  }

  deleteReview(review : Review){
    this.store.dispatch(fromReview.RemoveReview(review));
  }

  ngOnInit() {
    this.$reviews = this.store.pipe(select(fromReview.selectReviews));
  }

}
