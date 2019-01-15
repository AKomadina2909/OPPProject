package hr.fer.UporneNjuske.impl;

import java.util.List;

import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.RestaurantReview;
import hr.fer.UporneNjuske.rest.CreateRestaurantReviewDTO;
import hr.fer.UporneNjuske.rest.UpdateRestaurantReviewDTO;

public interface RestaurantReviewService {
    List<RestaurantReview> listAll();

    /**
     * Creates new restaurant review in the system.
     * @param restaurant review object to create, with ID set to null
     * @param username of logged in user
     * @return created restaurant review object in the system with ID set
     * @throws IllegalArgumentException if given restaurant review is null or its ID is not null
     */
    RestaurantReview createRestaurantReview(CreateRestaurantReviewDTO restaurantreview,String username);
    /**
     * Deletes all restaurant reviews in the system.
     */
    void DeleteAll();
    
    /**
     * Deletes restaurant review in the system with given id.
     * @param restaurant review id
     */
    void deleteById(Long id);
    
    /**
     * Deletes restaurant review in the system with given restaurant id.
     * @param restaurant id
     */
    void deleteByRestaurant(Long idRestaurant);
    
    /**
     * Deletes restaurant review in the system with given user id.
     * @param user id
     */
    void deleteByUser(String userName);
    
    /**
    * Updates RestaurantReview object in the database.
    * @param  RestaurantReview object to update
    * @return updated RestaurantReview object in the system
    */
    RestaurantReview updateRestaurantReview(UpdateRestaurantReviewDTO data);

    /**
     * Finds restaurant review in the system with given id.
     * @param restaurant review id
     * @return List of restaurant reviews in the system
     */
    RestaurantReview findById(Long id);
    
    /**
     * Finds restaurant reviews in the system with given restaurant id.
     * @param id of the restaurant
     * @return list of restaurant reviews in the system
     */
    List<RestaurantReview> findByRestaurant(Long idRestaurant);
    
    /**
     * Finds restaurant reviews in the system with given restaurant name.
     * @param name of the restaurant
     * @return list of restaurant reviews in the system
     */
    List<RestaurantReview> findByRestaurantName(String name);
    
    /**
     * Finds restaurant reviews in the system with given user id.
     * @param user id
     * @return list of restaurant reviews in the system
     */
    List<RestaurantReview> findByUser(String userName);
}
