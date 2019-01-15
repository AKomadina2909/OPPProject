package hr.fer.UporneNjuske.impl;

import java.util.HashMap;
import java.util.List;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.rest.RestaurantOrderDTO;

public interface RestaurantService {
    List<Restaurant> listAll();
    
    /**
     * Creates new restaurant in the system.
     * @param restaurant object to create, with ID set to null
     * @param username of restaurant owner
     * @return created restaurant object in the system with ID set
     * @throws IllegalArgumentException if given restaurant is null or its ID is not null
     */
    Restaurant createRestaurant(Restaurant restaurant,String username);
    
    /**
     * Deletes all restaurants in the system.
     */
    void DeleteAll();
    
    /**
     * Finds restaurant in the system with given id.
     * @param restaurant id
     * @return restaurant object in the system given id
     */
    Restaurant findRestaurantById(Long id);
    
    /**
     * Finds restaurant in the system with given name.
     * @param restaurant name
     * @return restaurant object in the system given name
     */
    Restaurant findRestaurantByName(String name);
    
    /**
     * Finds restaurant in the system with given location.
     * @param restaurant location
     * @return restaurant object in the system given location
     */
    Restaurant findRestaurantByLocation(String location);
    
    /**
     * Finds restaurant in the system with given iban.
     * @param restaurant iban
     * @return restaurant object in the system given iban
     */
    Restaurant findRestaurantByIban(String iban);
    
    /**
     * Finds restaurant in the system with given oib.
     * @param restaurant oib
     * @return restaurant object in the system given oib
     */
    Restaurant findRestaurantByOib(String oib);
    
    /**
     * Deletes restaurant in the system with given id.
     * @param restaurant id
     */
    void deleteById(Long id);
    
    /**
     * Deletes restaurant in the system with given location.
     * @param restaurant location
     */
    void deleteByLocation(String location);
    
    /**
     * Deletes restaurant in the system with given oib.
     * @param restaurant oib
     */
    void deleteByOib(String oib);
    
    /**
     * Deletes restaurant in the system with given iban.
     * @param restaurant iban
     */
    void deleteByIban(String iban);
    
    /**
     * Updates restaurant object in the system.
     * @param  restaurant object to update
     * @return updated restaurant object in the system
     */
    Restaurant updateRestaurant(Restaurant restaurant);
    
    /**
     * Gets total income per restaurant.
     * @param  restaurant id
     * @return income of restaurant
     */
    double getMoneyRestaurant(Long idRestaurant);
    
    /**
     * Gets number of orders per restaurant
     * @return HashMap<Restaurant,Integer>
     */
    HashMap<String,Integer> getOrdersByRestaurant();
    
    /**
     * Gets number of orders in restaurant by month
     * @param id of restaurant
     * @return HashMap<Restaurant,Integer>
     */
    HashMap<String,Integer> getOrdersByRestaurantMonth(RestaurantOrderDTO data);
    
    
    /**
     * Gets income per restaurant
     * @return HashMap<Restaurant,Double>
     */
    HashMap<String,Double>  getMoneyByRestaurant();
    

}
