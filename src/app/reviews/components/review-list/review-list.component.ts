import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewService} from "../../services/review.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public $reviews : Observable<Review[]>;

  constructor(private reviewService: ReviewService) {

  }

  deleteReview(review : Review){
    this.reviewService.removeReview(review);
  }

  ngOnInit() {
    this.$reviews = this.reviewService.getReviews();
  }

}
