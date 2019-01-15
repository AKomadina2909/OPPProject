 package hr.fer.UporneNjuske.impl;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import hr.fer.UporneNjuske.domain.Reservation;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateReservationDTO;
import hr.fer.UporneNjuske.rest.DeleteSelectedReservationDTO;
import hr.fer.UporneNjuske.rest.UpdateReservationDTO;

public interface ReservationService {
    List<Reservation> listAll();

    /**
     * Creates new reservation in the system.
     * @param reservation object to create, with ID set to null
     * @param username of logged in user
     * @return created reservation object in the system with ID set
     * @throws IllegalArgumentException if given reservation is null or its ID is not null
     */
    Reservation createReservation(CreateReservationDTO reservation,String username);
    /**
     * Deletes all reservations in the system.
     */
    void DeleteAll();

    /**
     * Deletes reservation in the system by given id
     * @param id
     */
    void deleteById (Long id);


    /**
     * Deletes reservation in the system by given time
     * @param time
     */
    void deleteByTime (String time);

    /**
     * Deletes reservation in the system by given user id
     * @param id
     */
    void deleteByUserId (Long id);

    /**
     * Deletes reservation in the system by given table id
     * @param  id
     */
    void deleteByTableId (Long id);

    /**
     * Finds reservation in the system with given id
     * @param id
     * @return reservation object in the system given id
     */
    Reservation findReservationById (Long id);

    /**
     * Finds reservation in the system with given time
     * @param  time
     * @return reservation object in the system with given time
     */
    Reservation findReservationByTime (Time time);

    /**
     * Finds reservation in the system with given user id
     * @param  id
     * @return reservation objects in the system with given user id
     */
    List<Reservation> findReservationByUserId (Long id);
    
    /**
     * Finds reservation in the system with given user username
     * @param  username
     * @return reservation objects in the system with given user username
     */
    List<Reservation> findReservationByUserName(String userName);

    /**
     * Finds reservation in the system with given table id
     * @param  id
     * @return reservation object in the system with given table id
     */
    List<Reservation> findReservationByTableId (Long id);

    /**
     * Updates reservation object in the system
     * @param reservation object to update
     * @return updated reservation object in the system
     */
    Reservation updateReservation (UpdateReservationDTO reservation);
    
    /**
     * Deletes all selected reservations in the system.
     * @param list of reservation ids
     */
    void deleteSelected(DeleteSelectedReservationDTO reservationId);
    
    
    /**
     * Finds reservation in the system with given table id
     * @param  id
     * @return reservation object in the system with given table id
     */
    List<Reservation> findReservationByRestaurantId (Long id);

}
