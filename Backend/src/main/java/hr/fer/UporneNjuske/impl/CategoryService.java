package hr.fer.UporneNjuske.impl;

import java.util.List;
import java.util.Optional;

import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateCategoryDTO;
import hr.fer.UporneNjuske.rest.UpdateCategoryDTO;

public interface CategoryService {
    List<Category> listAll();
    
    /**
     * Creates new category in the system.
     * @param category object to create, with ID set to null
     * @return created category object in the system with ID set
     * @throws IllegalArgumentException if given category is null or its ID is not null
     */
    Category createCategory(CreateCategoryDTO category,String username);
    
    /**
     * Deletes all categories in the system.
     */
    void DeleteAll();
    
    /**
     * Finds list of categories in the system in the given restaurant name.
     * @param name of restaurant
     * @return list of Category objects in the system with given Restaurant name
     */
    List<Category> findCategoryByRestaurant(String restaurantName);
    
    /**
     * Finds category witch given id in the system.
     * @param category id
     * @return category object in the system with given id
     */
    Category findCategoryById(Long id);
    
    /**
     * Finds category with given name in the system.
     * @param category name
     * @return category object in the system with given name
     */
    Category findCategoryByName(String name);
    
    /**
     * Updates category object in the system.
     * @param  category object to update
     * @return updated category object in the system
     */
    Category updateCategory(UpdateCategoryDTO data);
    
    /**
     * Deletes all categories in the system in the given restaurant.
     * @param id of restaurant
     */
    void deleteByRestaurant(Long id);
    
    /**
     * Deletes category in the system in the given restaurant.
     * @param id of category
     */
    void deleteById(Long id);
    
    
    

}
