package hr.fer.UporneNjuske.rest;

import java.util.HashMap;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.impl.RestaurantService;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	
	@GetMapping("")
	public List<Restaurant> listRestaurants(){
		return restaurantService.listAll();
	}
	@GetMapping("/id/{id}")
	public @ResponseBody Restaurant getById(@PathVariable Long id) {
	    return restaurantService.findRestaurantById(id);
	}
	@GetMapping("/money/{idRestaurant}")
	public double getIncome(@PathVariable Long idRestaurant) {
	    return restaurantService.getMoneyRestaurant(idRestaurant);
	}
	@GetMapping("/name/{name}")
	public @ResponseBody Restaurant getByName(@PathVariable String name) {
	    return restaurantService.findRestaurantByName(name);
	}
	@GetMapping("/ordersByRestaurant")
	public HashMap<String,Integer> getOrdersByRestaurant() {
	    return restaurantService.getOrdersByRestaurant();
	}
	@PostMapping("/ordersByRestaurant")
	public HashMap<String,Integer> getOrdersByRestaurantMonth(@RequestBody RestaurantOrderDTO data) {
	    return restaurantService.getOrdersByRestaurantMonth(data);
	}
	
	@GetMapping("/moneyByRestaurant")
	public HashMap<String,Double> getMoneyByRestaurant() {
	    return restaurantService.getMoneyByRestaurant();
	}
	@GetMapping("/location/{location}")
	public @ResponseBody Restaurant getByLocation(@PathVariable String location) {
	    return restaurantService.findRestaurantByLocation(location);
	}
	@GetMapping("/iban/{iban}")
	public @ResponseBody Restaurant getByIban(@PathVariable String iban) {
	    return restaurantService.findRestaurantByIban(iban);
	}
	@GetMapping("/oib/{oib}")
	public @ResponseBody Restaurant getByOib(@PathVariable String oib) {
	    return restaurantService.findRestaurantByOib(oib);
	}
	@PostMapping("")
	@Secured("ROLE_OWNER")
	public Restaurant createRestaurant(@RequestBody Restaurant restaurant,@AuthenticationPrincipal User u) {
		return restaurantService.createRestaurant(restaurant,u.getUsername());
	}
	@PostMapping("/update")
	@Secured("ROLE_OWNER")
	public Restaurant updateRestaurant(@RequestBody Restaurant restaurant) {
		return restaurantService.updateRestaurant(restaurant);
	}
	@DeleteMapping("")
	@Secured("ROLE_OWNER")
	public void deleteRestaurants() {
		restaurantService.DeleteAll();
	}
	@DeleteMapping("/id/{id}")
	@Secured("ROLE_OWNER")
	public void deleteById(@PathVariable Long id) {
	    restaurantService.deleteById(id);
	}
	@DeleteMapping("/location/{location}")
	@Secured("ROLE_OWNER")
	public void deleteByLocation(@PathVariable String location) {
	    restaurantService.deleteByLocation(location);
	}
	@DeleteMapping("/oib/{oib}")
	@Secured("ROLE_OWNER")
	public void deleteByOib(@PathVariable String oib) {
	    restaurantService.deleteByOib(oib);
	}
	@DeleteMapping("/iban/{iban}")
	@Secured("ROLE_OWNER")
	public void deleteByIban(@PathVariable String iban) {
	    restaurantService.deleteByIban(iban);
	}

}
