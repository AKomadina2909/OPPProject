package hr.fer.UporneNjuske.rest;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.RestaurantReview;
import hr.fer.UporneNjuske.impl.RestaurantReviewService;

@RestController
@RequestMapping("/restaurantreviews")
public class RestaurantReviewController {
	@Autowired
	private RestaurantReviewService restaurantReviewService;
	
	@GetMapping("")
	public List<RestaurantReview> listrestaurantreviews(){
		return restaurantReviewService.listAll();
	}
	@PostMapping("")
	@Secured({"ROLE_OWNER","ROLE_CLIENT"})
	public RestaurantReview createRestaurantReview(@RequestBody CreateRestaurantReviewDTO restaurantreview,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return restaurantReviewService.createRestaurantReview(restaurantreview,u.getUsername());
	}
	@DeleteMapping("")
	@Secured("ROLE_ADMIN")
	public void deleteRestaurantReviews() {
		restaurantReviewService.DeleteAll();
	}

	@GetMapping("/id/{id}")
	public RestaurantReview getById(@PathVariable("id") Long id) {
	    return restaurantReviewService.findById(id);
	}
	@GetMapping("/restaurant/{restaurantId}")
	public List<RestaurantReview> getByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
	    return restaurantReviewService.findByRestaurant(restaurantId);
	}
	@GetMapping("/restaurantname/{name}")
	public List<RestaurantReview> getByRestaurantName(@PathVariable("name") String name) {
	    return restaurantReviewService.findByRestaurantName(name);
	}
	@GetMapping("/user")
	public @ResponseBody List<RestaurantReview> getByUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
	    return restaurantReviewService.findByUser(u.getUsername());
	}
	
	@PostMapping("/update")
	@Secured({"ROLE_OWNER","ROLE_CLIENT"})
	public RestaurantReview updateRestaurantReview(@RequestBody UpdateRestaurantReviewDTO restaurantReview) {
		return restaurantReviewService.updateRestaurantReview(restaurantReview);
	}

	@DeleteMapping("/id/{id}")
	@Secured({"ROLE_ADMIN","ROLE_CLIENT"})
	public void deleteById(@PathVariable("id") Long id) {
		restaurantReviewService.deleteById(id);
	}
	@DeleteMapping("/restaurant/{restaurantId}")
	@Secured("ROLE_ADMIN")
	public void deleteByRestaurant(@PathVariable("restaurantId") Long id) {
		restaurantReviewService.deleteByRestaurant(id);
	}
	@DeleteMapping("/user/{userId}")
	@Secured({"ROLE_CLIENT","ROLE_ADMIN"})
	public void deleteByUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		restaurantReviewService.deleteByUser(u.getUsername());
	}
	

}
