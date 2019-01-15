package hr.fer.UporneNjuske.rest;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.impl.DemandMealService;


@RestController
@RequestMapping("/demandmeals")
public class DemandMealController {
	@Autowired
	private DemandMealService demandMealService;
	
	@GetMapping("")
	public List<DemandMeal> listordermeals(){
		return demandMealService.listAll();
	}
	@GetMapping("/id/{id}")
	public DemandMeal getById(@PathVariable("id") Long id) {
	    return demandMealService.findDemandMealById(id);
	}
	@GetMapping("/years/{nameRestaurant}")
	public HashSet<Integer> getAvaliableYears(@PathVariable("nameRestaurant") String nameRestaurant) {
	    return demandMealService.getAvailableYearsByRestaurant(nameRestaurant);
	}
	@GetMapping("/statisticRestaurant")
	public List<DemandMeal> getStatisticRestaurant(@RequestBody StatisticsRestaurantDTO data) {
	    return demandMealService.getStatisticRestaurant(data);
	}
	@GetMapping("/table/{tableId}")
	public List<DemandMeal> getByTable(@PathVariable("tableId") Long tableId) {
	    return demandMealService.findDemandMealByTable(tableId);
	}
	@GetMapping("/restaurant/{restaurantId}")
	public List<DemandMeal> gtByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
	    return demandMealService.findDemandMealByRestaurant(restaurantId);
	}
	@GetMapping("/user/{userName}")
	public List<DemandMeal> getByUser(@PathVariable("userName") String username) {
	    return demandMealService.findDemandMealByUser(username);
	}
	@PostMapping("")
	@Secured({"ROLE_CLIENT","ROLE_EMPLOYEE"})
	public DemandMeal createDemandMeal(@RequestBody CreateDemandMealDTO demandMeal,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return demandMealService.createOrderMeal(demandMeal,u.getUsername());
	}
	
	@PostMapping("/update")
	@Secured({"ROLE_CLIENT","ROLE_EMPLOYEE"})
	public DemandMeal updateDemandMeal(@RequestBody DemandMeal demandMeal) {
		return demandMealService.updateDemandMeal(demandMeal);
	}
	@PostMapping("/lock/{orderId}")
	@Secured({"ROLE_EMPLOYEE","ROLE_OWNER"})
	public void lockOrder(@PathVariable("orderId") Long orderId) {
		demandMealService.lockDemandMeal(orderId);
	}
	@DeleteMapping("")
	@Secured("ROLE_ADMIN")
	public void deleteDemandMeals() {
		demandMealService.DeleteAll();
	}
	@DeleteMapping("/id/{id}")
	public void deleteById(@PathVariable("id") Long id) {
	    demandMealService.deleteById(id);
	}
	@DeleteMapping("/table/{tableId}")
	public void deleteByTable(@PathVariable("tableId") Long id) {
	    demandMealService.deleteByTable(id);
	}
	@DeleteMapping("/user/{userId}")
	@Secured("ROLE_ADMIN")
	public void deleteByUser(@PathVariable("userId") Long id) {
	    demandMealService.deleteByUser(id);
	}
	

}
