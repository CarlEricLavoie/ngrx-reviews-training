import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromReview from "../../";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public reviewForm : FormGroup;

  constructor(private store : Store<fromReview.State>, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      rating : ['5', Validators.max(5)]
    })
  }

  addReview(){
    if(this.reviewForm.valid){
      const rating = this.reviewForm.value.rating;
      this.store.dispatch(fromReview.AddReview({rating}));
      this.reviewForm.reset({
        rating : 5
      });
    }
  }
}
