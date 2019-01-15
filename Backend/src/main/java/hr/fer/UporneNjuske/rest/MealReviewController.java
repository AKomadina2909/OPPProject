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
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.impl.MealReviewService;


@RestController
@RequestMapping("/mealreviews")
public class MealReviewController {
	@Autowired
	private MealReviewService mealReviewService;
	
	@GetMapping("")
	public List<MealReview> listmealreviews(){
		return mealReviewService.listAll();
	}
	@PostMapping("")
	@Secured({"ROLE_OWNER","ROLE_CLIENT"})
	public MealReview createMealReview(@RequestBody CreateMealReviewDTO mealreviewDTO,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return mealReviewService.createMealReview(mealreviewDTO,u.getUsername());
	}
	@DeleteMapping("")
	@Secured("ROLE_ADMIN")
	public void deleteMealReviews() {
		mealReviewService.DeleteAll();
	}
	
	@GetMapping("/id/{id}")
	public MealReview getById(@PathVariable("id") Long id) {
	    return mealReviewService.findById(id);
	}
	@GetMapping("/order/{orderId}")
	public List<MealReview> getByOrder(@PathVariable("orderId") Long orderId) {
	    return mealReviewService.findByOrder(orderId);
	}
	@GetMapping("/restaurant/{restaurantId}")
	public List<MealReview> getByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
	    return mealReviewService.findByRestaurant(restaurantId);
	}
	@GetMapping("/restaurantname/{name}")
	public List<MealReview> getByRestaurantName(@PathVariable("name") String name) {
	    return mealReviewService.findByRestaurantName(name);
	}
	@GetMapping("/user")
	public List<MealReview> getByUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
	    return mealReviewService.findByUser(u.getUsername());
	}
	
	@PostMapping("/update")
	@Secured({"ROLE_OWNER","ROLE_CLIENT"})
	public MealReview updateMealReview(@RequestBody UpdateMealReviewDTO mealReview) {
		return mealReviewService.updateMealReview(mealReview);
	}

	@DeleteMapping("/id/{id}")
	@Secured({"ROLE_OWNER","ROLE_CLIENT","ROLE_ADMIN"})
	public void deleteById(@PathVariable("id") Long id) {
		mealReviewService.deleteById(id);
	}
	@DeleteMapping("/order/{orderId}")
	@Secured("ROLE_ADMIN")
	public void deleteByOrder(@PathVariable("orderId") Long id) {
		mealReviewService.deleteByOrder(id);
	}
	@DeleteMapping("/user")
	@Secured({"ROLE_OWNER","ROLE_CLIENT"})
	public void deleteByUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		mealReviewService.deleteByUser(u.getUsername());
	}
	

}
