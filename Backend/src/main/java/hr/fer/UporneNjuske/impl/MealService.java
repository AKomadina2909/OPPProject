package hr.fer.UporneNjuske.impl;

import java.util.HashMap;
import java.util.List;

import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.rest.CreateMealDTO;
import hr.fer.UporneNjuske.rest.OrderedMealFrequencyDTO;
import hr.fer.UporneNjuske.rest.UpdateMealDTO;

public interface MealService {
    List<Meal> listAll();
    
    /**
     * Creates new meal in the system.
     * @param data object for creating meal, with ID set to null
     * @return created meal object in the system with ID set
     * @throws IllegalArgumentException if given meal is null or its ID is not null
     */
    Meal createMeal(CreateMealDTO meal);
    /**
     * Deletes all meals in the system.
     */
    void DeleteAll();
    /** 
     * Deletes meal in the system with given id
     * @param idMeal
     */
    void deleteByIdMeal(Long idMeal);
    /**
     * Deletes meal in the system with given category
     * @param idCategory
     */
    void deleteByIdCategory(Long idCategory);
    /**
     * Finds meal in the system with given id 
     * @param idMeal
     * @return meal object
     */
    Meal findMealByIdMeal(Long idMeal);
    /**
     * Finds meal in the system with given category
     * @param idCategory
     * @return list of meal objects
     */
    List<Meal> findMealByIdCategory(Long idCategory);
    /**
     * Updates meal object in the system
     * @param meal
     * @return
     */
    Meal updateMeal(UpdateMealDTO data);
    
    /**
     * Finds meals in the system with given Table
     * @param idTable
     * @return list of meal objects
     */
    List<Meal> findMealByTable(Long idTable);
    
    /**
     * Finds meals in the system with given Restaurant
     * @param idRestaurant
     * @return list of meal objects
     */
    List<Meal> findMealByRestaurant(String nameRestaurant);
    
    /**
     * Finds how many times has meal been ordered
     * @param idMeal
     * @return frequency
     */
    int getMealFrequency(Long idMeal);
    
    HashMap<String,Integer> getMealOrderFrequency(OrderedMealFrequencyDTO mealIds);
    
    Double getOrderPrice(OrderedMealFrequencyDTO mealIds);
    
    HashMap<String,Integer> getMostPopularMeals();
    
    
    
}
