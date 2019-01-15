package hr.fer.UporneNjuske.impl;

import java.util.List;

import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateTableDTO;
import hr.fer.UporneNjuske.rest.UpdateTableDTO;

public interface TableService {
    List<Table> listAll();


    /**
     * Creates new table in the system.
     *
     * @param table object to create, with ID set to null
     * @param username of logged in user
     * @return created table object in the system with ID set
     * @throws IllegalArgumentException if given table is null or its ID is not null
     */
    Table createTable(CreateTableDTO table, String username);

    /**
     * Finds table in the system.
     *
     * @param table id
     * @return table object in the system with given id
     */
    Table findTable(Long id);

   

    /**
     * Finds tables of desired capacity
     *
     * @param table capacity
     * @return returns collection of tables of same capacity
     */
    List<Table> findTablesByCapacity(int capacity);
    
    /**
     * Finds list of tables in the system in the given restaurant.
     * @param name of restaurant
     * @return list of Table objects in the system with given Restaurant id
     */
    List<Table> findTableByRestaurant(String nameRestaurant);

    /**
     * Deletes table by its ID
     */
    void deleteTableById(Long idTable);


    
    
    /**
     * Deletes all tables in the system in the given restaurant.
     * @param id of restaurant
     */
    void deleteByRestaurant(Long id);

    /**
     * Deletes all tables with selected capacity
     */
    void deleteByCapacity(int capacity);

    /**
     * Deletes all tables in the system
     */
    void DeleteAll();
   
    
    /**
     * Updates table object in the system.
     * @param  table object to update
     * @param owner username
     * @return updated table object in the system
     */
    Table updateTable(UpdateTableDTO data);
}
