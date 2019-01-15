package hr.fer.UporneNjuske.rest;

import java.util.HashMap;
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

import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.impl.MealService;

@RestController
@RequestMapping("/meals")
public class MealController {
	@Autowired
	private MealService mealService;
	
	@GetMapping("")
	public List<Meal> listmeals(){
		return mealService.listAll();
	}
	@GetMapping("/id/{idMeal}")
	public Meal getByIdMeal(@PathVariable Long idMeal){
		return mealService.findMealByIdMeal(idMeal);
	}
	@GetMapping("/frequency/{idMeal}")
	public int getMealFrequency(@PathVariable Long idMeal){
		return mealService.getMealFrequency(idMeal);
	}
	@GetMapping("/mostpopular")
	public HashMap<String,Integer> getMostPopularMeals(){
		return mealService.getMostPopularMeals();
	}
	@GetMapping("/table/{idTable}")
	public List<Meal> getByTable(@PathVariable Long idTable){
		return mealService.findMealByTable(idTable);
	}
	@GetMapping("/restaurant/{nameRestaurant}")
	public List<Meal> getByRestaurant(@PathVariable String nameRestaurant){
		return mealService.findMealByRestaurant(nameRestaurant);
	}
	@GetMapping("/category/{idCategory}")
	public List<Meal> getByIdCategory(@PathVariable Long idCategory){
		return mealService.findMealByIdCategory(idCategory);
	}
	
	@PostMapping("")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public Meal createMeal(@RequestBody CreateMealDTO meal) {
		return mealService.createMeal(meal);
	}
	@PostMapping("/update")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public Meal updateMeal(@RequestBody UpdateMealDTO meal) {
		return mealService.updateMeal(meal);
	}
	@DeleteMapping("")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public void deleteMeals() {
		mealService.DeleteAll();
	}
	@DeleteMapping("/idMeal/{idMeal}")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public void deleteById(@PathVariable Long idMeal) {
	    mealService.deleteByIdMeal(idMeal);
	}
	@DeleteMapping("/idCategory/{idCategory}")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public void deleteByIdCategory(@PathVariable Long idCategory) {
	    mealService.deleteByIdCategory(idCategory);
	}
	@PostMapping("/orderFrequency")
	public HashMap<String,Integer> getOrderFrequency(@RequestBody OrderedMealFrequencyDTO mealIds){
		return mealService.getMealOrderFrequency(mealIds);
	}
	
	@PostMapping("/orderPrice")
	public Double getOrderPrice(@RequestBody OrderedMealFrequencyDTO mealIds){
		return mealService.getOrderPrice(mealIds);
	}
	
	
}
