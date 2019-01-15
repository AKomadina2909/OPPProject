package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.UporneNjuske.domain.RestaurantReview;

public interface RestaurantReviewRepository extends JpaRepository<RestaurantReview,Long> {

}
