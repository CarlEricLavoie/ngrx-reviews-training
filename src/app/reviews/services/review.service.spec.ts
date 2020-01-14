import {TestBed} from '@angular/core/testing';

import {ReviewService} from './review.service';
import {first} from "rxjs/operators";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";
import {constants} from "http2";

describe('ReviewService', () => {
  let service: ReviewService,
    httpClient: HttpClient,
    mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
    service = TestBed.get(ReviewService);
    httpClient = TestBed.get(HttpClient);
    mockBackend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    mockBackend.verify();
  });

  describe('getReviews', () => {

    it('should fetch reviews on first call', () => {
      const $reviews = service.getReviews();
      const req = mockBackend.expectOne(ReviewService.REVIEWS_URL);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should not fetch reviews on subsequent calls', () => {
      service.getReviews();
      service.getReviews();
      const req = mockBackend.expectOne(ReviewService.REVIEWS_URL);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('addReview', () => {
    it('should add a new review to the list of existing reviews', async () => {
      const $reviews = service.getReviews();
      const getReq = mockBackend.expectOne(ReviewService.REVIEWS_URL);
      getReq.flush([]);

      const size = (await $reviews.pipe(first()).toPromise()).length;
      service.addReview(4);

      const postReq = mockBackend.expectOne(ReviewService.REVIEWS_URL);
      postReq.flush({rating : 5, id : 1234} as Review);
      expect(postReq.request.method).toBe('POST');

      const updatedSize = (await $reviews.pipe(first()).toPromise()).length;
      expect(updatedSize).toBe(size + 1);
    })
  });

  describe('removeReview', ()=>{
    it('should remove all reviews with matching id', async ()=>{
      //Initialize reviews
      const $reviews = service.getReviews();
      const req = mockBackend.expectOne(ReviewService.REVIEWS_URL);
      req.flush([{ rating : 5, id: 1}, {rating : 2, id: 1}, {rating : 2, id: 4}]);

      //Check that reviews have been initialized properly
      let reviews = await $reviews.pipe(first()).toPromise();
      expect(reviews.length).toBe(3);

      //Remove the review
      service.removeReview({id : 1, rating : 3});
      const postReq = mockBackend.expectOne(ReviewService.REVIEWS_URL + '/' + 1);
      postReq.flush({} as Review);
      expect(postReq.request.method).toBe('DELETE');

      //check expectations
      reviews = await $reviews.pipe(first()).toPromise();
      expect(reviews.length).toBe(1);
    })
  })
});
