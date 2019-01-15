package hr.fer.UporneNjuske.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.MealRepository;
import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateMealDTO;
import hr.fer.UporneNjuske.rest.OrderedMealFrequencyDTO;
import hr.fer.UporneNjuske.rest.UpdateMealDTO;

@Service
public class MealServiceJpa implements MealService {
	@Autowired
	private MealRepository mealrepo;
	
	@Autowired
	private DemandMealService demandmealservice;
	
	@Autowired
	private CategoryService categoryservice;
	
	@Autowired
	private TableService tableservice;
	
	@Autowired
	private RestaurantService restaurantservice;
	
	@Autowired
	private MealReviewService mealreviewservice;
	
	@Override
	public List<Meal> listAll(){
		return mealrepo.findAll();
	}

	@Override
	public Meal createMeal(CreateMealDTO data) {
		Assert.notNull(data.getIdCategory(),"Category id must be given.");
		Category category=categoryservice.findCategoryById(data.getIdCategory());
		Assert.notNull(category,"Category with given id does not exist.");
		Meal meal=new Meal(data.getMealName(),data.getDetails(),data.getMealPrice(),category);
		Assert.notNull(meal, "Meal object must be given");
		Assert.isNull(meal.getIdMeal(),"Meal ID must be null, not"+meal.getIdMeal());
		
		String name=meal.getMealName();
		Assert.hasText(name,"Meal name must be given.");
		Assert.isTrue(name.length()<=45,"Meal name must be between 1 and 45 characters.");
		
		double price=meal.getMealPrice();
		Assert.isTrue(price>=0,"Meal price must be at least 0");
		
		return mealrepo.save(meal);
	}

	@Override
	public void DeleteAll() {
		mealrepo.deleteAll();
		
	}

	@Override
	public void deleteByIdMeal(Long idMeal) {
		List<DemandMeal> orders=demandmealservice.listAll();
		Meal meal=this.findMealByIdMeal(idMeal);
		for(DemandMeal order:orders) {
			List<Meal> orderedmeals=order.getMeals();
			if(orderedmeals.contains(meal)) demandmealservice.deleteById(order.getIdOrder());
		}
		mealrepo.delete(meal);
		
	}

	@Override
	public void deleteByIdCategory(Long idCategory) {
		List<Meal> meals;
		meals = mealrepo.findAll();
		for(Meal meal : meals) {
			Category tmp=meal.getIdCategory();
			if(tmp.getIdCategory().equals(idCategory))
				this.deleteByIdMeal(meal.getIdMeal());
		}
	}

	@Override
	public Meal findMealByIdMeal(Long idMeal) {
		List<Meal> meals;
		meals = mealrepo.findAll();
		for(Meal meal : meals) {
			if(meal.getIdMeal().equals(idMeal))
				return meal;
		}
		return null;
	}

	@Override
	public List<Meal> findMealByIdCategory(Long idCategory) {
		List<Meal> meals;
		List<Meal> search=new ArrayList<Meal>();
		meals = mealrepo.findAll();
		for(Meal meal : meals) {
			Category tmp=meal.getIdCategory();
			if(tmp.getIdCategory().equals(idCategory)) search.add(meal);
		}
		return search;
	}

	@Override
	public Meal updateMeal(UpdateMealDTO data) {
		Meal meal=this.findMealByIdMeal(data.getIdMeal());
		meal.setDetails(data.getDetails());
		meal.setMealName(data.getMealName());
		meal.setMealPrice(data.getMealPrice());
		Category category=categoryservice.findCategoryById(data.getIdCategory());
		meal.setIdCategory(category);
		return mealrepo.save(meal);
	}

	@Override
	public List<Meal> findMealByTable(Long idTable) {
		Table table=tableservice.findTable(idTable);
		List<Meal> all=mealrepo.findAll();
		List<Meal> search=new ArrayList<Meal>();
		for(Meal meal:all) {
			Category category=meal.getIdCategory();
			Restaurant restaurant=category.getIdRestaurant();
			if(restaurant.getIdRestaurant().equals(table.getIdRestaurant().getIdRestaurant())) search.add(meal);
		}
		return search;
	}

	@Override
	public List<Meal> findMealByRestaurant(String nameRestaurant) {
		Restaurant restaurant=restaurantservice.findRestaurantByName(nameRestaurant);
		List<Meal> all=mealrepo.findAll();
		List<Meal> search=new ArrayList<Meal>();
		for(Meal meal:all) {
			Category category=meal.getIdCategory();
			Restaurant tmp=category.getIdRestaurant();
			if(restaurant.getNameRestaurant().equals(tmp.getNameRestaurant())) search.add(meal);
		}
		return search;
	}

	@Override
	public int getMealFrequency(Long idMeal) {
		List<DemandMeal> orders=demandmealservice.listAll();
		int counter=0;
		for(DemandMeal order:orders) {
			List<Meal> orderedmeals=order.getMeals();
			for(Meal meal:orderedmeals) {
				if(meal.getIdMeal().equals(idMeal)) {
					counter++;
				}
			}
		}
		return counter;
	}

	@Override
	public HashMap<String,Integer> getMealOrderFrequency(OrderedMealFrequencyDTO mealIds) {
		List<Long> orderedMealIDS=mealIds.getIdMeals();
		List<Integer> frequency=new ArrayList<Integer>();
		Assert.isTrue(orderedMealIDS.size()>0,"Nepostojeca narudzba");
		HashMap<String,Integer> mapa=new HashMap<String,Integer>();
		for(Long id:orderedMealIDS) {
			Meal meal=this.findMealByIdMeal(id);
			String name=meal.getMealName();
			mapa.put(name,0);
			
		}
		for(Long id:orderedMealIDS) {
			Meal meal=this.findMealByIdMeal(id);
			Integer count=mapa.get(meal.getMealName());
			count++;
			mapa.put(meal.getMealName(), count);
			
		}
		return mapa;
		
	}
	@Override
	public HashMap<String, Integer> getMostPopularMeals() {
		List<Meal> allmeals=this.listAll();
		List<DemandMeal> allorders=demandmealservice.listAll();
		HashMap<String,Integer> mapa=new HashMap<String,Integer>();
		for(Meal meal:allmeals) {
			mapa.put(meal.getMealName(), 0);
		}
		for(DemandMeal order:allorders) {
			List<Meal> orderedMeals=order.getMeals();
			for(Meal meal:orderedMeals) {
				Integer count=mapa.get(meal.getMealName());
				count++;
				mapa.put(meal.getMealName(),count);
			}
		}
		return mapa;
	}

	@Override
	public Double getOrderPrice(OrderedMealFrequencyDTO mealIds) {
		List<Long> orderedMealIDS=mealIds.getIdMeals();
		double totalPrice=0;
		for(Long id:orderedMealIDS) {
			Meal meal=this.findMealByIdMeal(id);
			totalPrice=totalPrice+meal.getMealPrice();
			
		}
		return totalPrice;
	}

	

}
