import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../services/review.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public reviewForm : FormGroup;

  constructor(private reviewService: ReviewService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      rating : ['5', Validators.max(5)]
    })
  }

  addReview(){
    if(this.reviewForm.valid){
      this.reviewService.addReview(this.reviewForm.value.rating);
      this.reviewForm.reset({
        rating : 5
      });
    }
  }
}
