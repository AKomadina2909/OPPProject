package hr.fer.UporneNjuske.impl;

import java.util.HashMap;
import java.util.List;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Role;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.ChangeRoleUserDTO;
import hr.fer.UporneNjuske.rest.LoginDTO;

public interface UserService{
    List<User> listAll();
    List<User> listClients();

    /**
     * Creates new user review in the system.
     * @param user review object to create, with ID set to null
     * @return created user review object in the system with ID set
     * @throws IllegalArgumentException if given user review is null or its ID is not null
     */
    User createUser(User user);
    
    /**
     * Deletes all users in the system.
     */
    void DeleteAll();
    
    /**
     * Finds user in the system by id.
     * @param user id
     * @return user object in the system with given id 
     */
    User findUserById(Long id);
    
    /**
     * Finds user in the system by username.
     * @param user username
     * @return user object in the system with given username
     */
    User findUserByUsername(String userName);
    
    /**
     * Finds list of users in the system in the given restaurant.
     * @param id of restaurant
     * @return list of User objects in the system with given Restaurant id
     */
    List<User> findUserByRestaurant(Long id);
    

    /**
     * Deletes user in the system with given id.
     * @param user id
     */
    void deleteById(Long id);
    
    /**
     * Deletes user in the system with given username.
     * @param user username
     */
    void deleteByUserName(String userName);
    
    /**
     * Deletes all users in the system in the given restaurant.
     * @param id of restaurant
     */
    void deleteByRestaurant(Long id);
    
    /**
     * Updates user object in the system.
     * @param  user object to update
     * @return updated user object in the system
     */
    User updateUser(User user);
    
    /**
     * Changes role of user object in system
     * @param data object
     */
    void changeRole(ChangeRoleUserDTO data);
    
    /**
     * Adds user with given username as employee in owner restaurant
     * @param username of the User object
     * @param username of owner
     */
    void hireUser(String username,String ownername);
    
    /**
     * Deletes user with given username from owners restaurant
     * @param username of the User object
     * @param username of owner
     */
    void fireUser(String username,String ownername);
    
    /**
     * Checks whether user with given username and password existes in system
     * @param username
     * @param password
     * @param User object in system
     */
    User login(LoginDTO data);
    
    /**
     * Gets number of orders per user
     * @return HashMap<User,Integer>
     */
    HashMap<String,Integer> getNumberOrdersByUser();

   
}
