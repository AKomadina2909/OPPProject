package hr.fer.UporneNjuske.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.CategoryRepository;
import hr.fer.UporneNjuske.dao.RestaurantRepository;
import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateCategoryDTO;
import hr.fer.UporneNjuske.rest.UpdateCategoryDTO;

@Service
public class CategoryServiceJpa implements CategoryService {
	@Autowired
	private CategoryRepository categoryrepo;
	
	@Autowired
	private RestaurantService restaurantservice;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private MealService mealservice;
	
	@Override
	public List<Category> listAll(){
		return categoryrepo.findAll();
	}

	@Override
	public Category createCategory(CreateCategoryDTO data,String username) {
		User user=userservice.findUserByUsername(username);
		Assert.notNull(user,"Logged in user is not valid.");
		Restaurant restaurant=user.getIdRestaurant();
		Assert.notNull(restaurant,"Restaurant must already exist.");
		Category category=new Category(data.getNameCategory(),restaurant);
		Assert.notNull(category, "Category object must be given");
		Assert.isNull(category.getIdCategory(),"Category ID must be null, not"+category.getIdCategory());
		
		String name=category.getNameCategory();
		Assert.hasText(name,"Category name must be given.");
		Assert.isTrue(name.length()<=45,"Category name must be between 1 and 45 characters.");
		
			

		
		return categoryrepo.save(category);
		
	}

	@Override
	public void DeleteAll() {
		categoryrepo.deleteAll();
		
	}

	@Override
	public Category findCategoryById(Long id) {
		List<Category> categories;
		categories=categoryrepo.findAll();
		for(Category category:categories) {
			if(category.getIdCategory()==id) return category;
		}
		return null;
	}

	@Override
	public List<Category> findCategoryByRestaurant(String restaurantName) {
		List<Category> categories;
		List<Category> search = new ArrayList<Category>();
		categories=categoryrepo.findAll();
		for(Category category:categories) {
			Restaurant tmp=category.getIdRestaurant();
			if(tmp.getNameRestaurant().equals(restaurantName)) search.add(category);
		}
		return search;
	}

	@Override
	public Category updateCategory(UpdateCategoryDTO data) {
		Category category=this.findCategoryById(data.getIdCategory());
		category.setNameCategory(data.getNameCategory());
		return categoryrepo.save(category);
	}

	@Override
	public void deleteByRestaurant(Long id) {
		List<Category> categories;
		categories=categoryrepo.findAll();
		for(Category category:categories) {
			Restaurant tmp=category.getIdRestaurant();
			if(tmp.getIdRestaurant()==id) this.deleteById(category.getIdCategory());
		}
	}

	@Override
	public void deleteById(Long id) {
		mealservice.deleteByIdCategory(id);		
		List<Category> categories;
		categories=categoryrepo.findAll();
		for(Category category:categories) {
			if(category.getIdCategory()==id) categoryrepo.delete(category);
		}	
	}

	@Override
	public Category findCategoryByName(String name) {
		List<Category> categories;
		categories=categoryrepo.findAll();
		for(Category category:categories) {
			if(category.getNameCategory().equals(name)) return category;
		}
		return null;
	}

}
