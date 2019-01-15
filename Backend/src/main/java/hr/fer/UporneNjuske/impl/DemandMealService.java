package hr.fer.UporneNjuske.impl;

import java.util.HashSet;
import java.util.List;

import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.rest.CreateDemandMealDTO;
import hr.fer.UporneNjuske.rest.StatisticsRestaurantDTO;

public interface DemandMealService {
    List<DemandMeal> listAll();
    
    /**
     * Creates new order meal in the system.
     * @param order meal object to create, with ID set to null
     * @param username of logged in user
     * @return created order meal object in the system with ID set
     * @throws IllegalArgumentException if given order meal is null or its ID is not null
     */
    DemandMeal createOrderMeal(CreateDemandMealDTO ordermeal,String username);
    
    /**
     * Deletes all orders in the system.
     */
    void DeleteAll();
    
    /**
     * Updates DemandMeal object in the system.
     * @param  DemandMeal object to update
     * @return updated DemandMeal object in the system
     */
    DemandMeal updateDemandMeal(DemandMeal demandmeal);
    
    /**
     * Deletes demand meal in the system with given id.
     * @param demand meal id
     */
    void deleteById(Long id);
    
    /**
     * Deletes demand meal in the system with given user id.
     * @param user id
     */
    void deleteByUser(Long id);
    
    /**
     * Deletes demand meal in the system with given table id.
     * @param table id
     */
    void deleteByTable(Long id);
    
    /**
     * Finds demand meal in the system with given id.
     * @param demand meal id
     * @return DemandMeal object in the system
     */
    DemandMeal findDemandMealById(Long id);
    
    /**
     * Finds demand meal in the system with given table id.
     * @param table id
     * @return DemandMeal object in the system
     */
    List<DemandMeal> findDemandMealByTable(Long id);
    
    /**
     * Finds demand meal in the system with given userName.
     * @param userName
     * @return DemandMeal object in the system
     */
    List<DemandMeal> findDemandMealByUser(String userName);
    
    /**
     * Finds demand meal in the system with given restaurant id.
     * @param restaurant id
     * @return DemandMeal objects in the system
     */
    List<DemandMeal> findDemandMealByRestaurant(Long idRestaurant);
    
    /**
     * Lock order in the system with given order id.
     * @param order id
     */
    void lockDemandMeal (Long idOrder);
    
    /**
     * Gets all available years to show in selected restaurant
     * @param idRestaurant
     * @return list of years
     */
    HashSet<Integer> getAvailableYearsByRestaurant(String nameRestaurant);
    
    /**
     * Gets all orders in restaurant in selected month
     * @param data(month,year,idRestaurant)
     * @return list of orders
     */
    List<DemandMeal> getStatisticRestaurant(StatisticsRestaurantDTO data);
    
    

}
