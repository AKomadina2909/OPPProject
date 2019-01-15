package hr.fer.UporneNjuske.rest;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import hr.fer.UporneNjuske.domain.Reservation;
import hr.fer.UporneNjuske.impl.ReservationService;


@RestController
@RequestMapping("/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("")
	public List<Reservation> listreservations(){
		return reservationService.listAll();
	}
	@GetMapping("/id/{id}")
	public @ResponseBody Reservation getById (@PathVariable Long id) {return reservationService.findReservationById(id);}
	@GetMapping("/user/{userId}")
	public @ResponseBody List<Reservation> getByUserId (@PathVariable Long userId) {
		return reservationService.findReservationByUserId(userId);
	}
	@GetMapping("/username")
	public @ResponseBody List<Reservation> getByUserName (@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return reservationService.findReservationByUserName(u.getUsername());
	}
	@GetMapping("/table/{tableId}")
	public @ResponseBody List<Reservation> getByTableId (@PathVariable Long tableId) {
		return reservationService.findReservationByTableId(tableId);
	}
	@GetMapping("/restaurant/{restaurantId}")
	public @ResponseBody List<Reservation> getByRestaurantId (@PathVariable Long restaurantId) {
		return reservationService.findReservationByRestaurantId(restaurantId);
	}
	@GetMapping("/time/{time}")
	public @ResponseBody Reservation getByTime (@PathVariable Time time) {
		return reservationService.findReservationByTime(time);
	}
	@PostMapping("")
	@Secured("ROLE_CLIENT")
	public Reservation createReservation(@RequestBody CreateReservationDTO reservation,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return reservationService.createReservation(reservation,u.getUsername());
	}
	@PostMapping("/update")
	@Secured("ROLE_CLIENT")
	public Reservation updateReservation(@RequestBody UpdateReservationDTO reservation) {
		return reservationService.updateReservation(reservation);
	}
	@DeleteMapping("")
	@Secured("ROLE_CLIENT")
	public void deleteReservatins() {
		reservationService.DeleteAll();
	}
	@DeleteMapping("/selected")
	@Secured("ROLE_CLIENT")
	public void deleteSelectedReservatins(@RequestBody DeleteSelectedReservationDTO reservations) {
		reservationService.deleteSelected(reservations);
	}
	@DeleteMapping("/id/{id}")
	@Secured("ROLE_CLIENT")
	public void deleteById(@PathVariable Long id) { 
		reservationService.deleteById(id); 
	}
	@DeleteMapping("/user/{userId}")
	@Secured("ROLE_CLIENT")
	public void deleteByUserId (@PathVariable Long userId) {
		reservationService.deleteByUserId(userId);
	}
	@DeleteMapping("/table/{tableId}")
	@Secured("ROLE_CLIENT")
	public void deleteByTableId (@PathVariable Long tableId) {
		reservationService.deleteByTableId(tableId);
	}
	@DeleteMapping("/time/{time}")
	@Secured("ROLE_CLIENT")
	public void deleteByTime (@PathVariable String time) {
		reservationService.deleteByTime(time);
	}

}
