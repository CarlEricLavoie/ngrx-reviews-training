import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from "rxjs";
import {Review} from "../models/review";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {withLatestFrom} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  static REVIEWS_URL = environment.backendUrl + '/reviews';
  private $reviews = new ReplaySubject<Review[]>(1);
  private $fetchReviews: Subscription;

  constructor(private http: HttpClient) {
  }

  fetchReviews() {
    return this.http.get<Review[]>(ReviewService.REVIEWS_URL);
  }


  /**
   * Returns the list of reviews as an Observable
   */
  getReviews(): Observable<Review[]> {
    return this.$reviews.asObservable();
  }

  /**
   * Create a new review and adds it to the list of existing reviews
   * @param rating
   */
  addReview(rating: number) {
    return this.http.post<Review>(ReviewService.REVIEWS_URL, {rating, id: Date.now()})
  }

  /**
   * Removes the provided review from the list of existing reviews
   * @param review
   */
  removeReview(id: number) {
    return this.http.delete<Review>(ReviewService.REVIEWS_URL + '/' + id);
  }
}
