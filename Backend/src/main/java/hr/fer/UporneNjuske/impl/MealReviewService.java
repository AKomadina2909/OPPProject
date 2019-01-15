package hr.fer.UporneNjuske.impl;

import java.util.List;

import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.rest.CreateMealReviewDTO;
import hr.fer.UporneNjuske.rest.UpdateMealReviewDTO;


public interface MealReviewService {
    List<MealReview> listAll();

    /**
     * Creates new meal review in the system.
     * @param meal review object to create, with ID set to null
     * @param username of logged in user
     * @return created meal review object in the system with ID set
     * @throws IllegalArgumentException if given meal review is null or its ID is not null
     */
    MealReview createMealReview(CreateMealReviewDTO mealreview,String username);
    /**
     * Deletes all meal reviews in the system.
     */
    void DeleteAll();
    
    /**
     * Deletes meal review in the system with given id.
     * @param meal review id
     */
    void deleteById(Long id);

    /**
     * Deletes meal review in the system with given order id.
     * @param order id
     */
    void deleteByOrder(Long idOrder);
    
    /**
     * Deletes meal review in the system with given user id.
     * @param user id
     */
    void deleteByUser(String username);
    
    /**
     * Updates MealReview object in the database.
     * @param  ModelReview object to update
     * @return updated MealReview object in the system
     */
    MealReview updateMealReview(UpdateMealReviewDTO data);
    
    /**
     * Finds meal review in the system with given id.
     * @param meal review id
     * @return MealReview object in the system
     */
    MealReview findById(Long id);
    
    /**
     * Finds meal reviews in the system with given order id.
     * @param id of the order
     * @return list of meal reviews in the system
     */
    List<MealReview> findByOrder(Long idOrder);
    
    /**
     * Finds meal reviews in the system with given restaurant id.
     * @param id of the restaurant
     * @return list of meal reviews in the system
     */
    List<MealReview> findByRestaurant(Long idRestaurant);
    
    /**
     * Finds meal reviews in the system with given restaurant name.
     * @param name of the restaurant
     * @return list of meal reviews in the system
     */
    List<MealReview> findByRestaurantName(String name);
    
    /**
     * Finds meal reviews in the system with given user id.
     * @param user id
     * @return list of meal reviews in the system
     */
    List<MealReview> findByUser(String username);
    
    
}
