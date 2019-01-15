package hr.fer.UporneNjuske.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;


import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.impl.CategoryService;


@RestController
@RequestMapping("/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("")
	public List<Category> listcategories(){
		return categoryService.listAll();
	}
	@GetMapping("/name/{nameCategory}")
	public Category getByNameCategory(@PathVariable String nameCategory){
		return categoryService.findCategoryByName(nameCategory);
	}
	@GetMapping("/id/{id}")
	public @ResponseBody Category getById(@PathVariable Long id) {
	    return categoryService.findCategoryById(id);
	}
	@GetMapping("/restaurant/{restaurantName}")
	public @ResponseBody List<Category> getByRestaurant(@PathVariable String restaurantName) {
	    return categoryService.findCategoryByRestaurant(restaurantName);
	}
	@PostMapping("")
	@Secured("ROLE_OWNER")
	public Category createCategory(@RequestBody CreateCategoryDTO category,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		return categoryService.createCategory(category,u.getUsername());
	}
	@PostMapping("/update")
	@Secured("ROLE_OWNER")
	public Category updateCategory(@RequestBody UpdateCategoryDTO category) {
		return categoryService.updateCategory(category);
	}
	@DeleteMapping("")
	@Secured("ROLE_OWNER")
	public void deleteCategories() {
		categoryService.DeleteAll();
	}
	@DeleteMapping("/id/{id}")
	@Secured("ROLE_OWNER")
	public void deleteById(@PathVariable Long id) {
	    categoryService.deleteById(id);;
	}
	@DeleteMapping("/restaurant/{restaurantId}")
	@Secured("ROLE_OWNER")
	public void deleteByRestaurant(@PathVariable Long restaurantId) {
	    categoryService.deleteByRestaurant(restaurantId);
	}

}
