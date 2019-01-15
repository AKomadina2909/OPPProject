package hr.fer.UporneNjuske.impl;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.DemandMealRepository;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Status;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateDemandMealDTO;
import hr.fer.UporneNjuske.rest.StatisticsRestaurantDTO;


@Service
public class DemandMealServiceJpa implements DemandMealService {
	@Autowired
	private DemandMealRepository demandmealrepo;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private TableService tableservice;
	
	@Autowired
	private MealService mealservice;
	
	@Autowired
	private MealReviewService mealreviewservice;
	
	@Override
	public List<DemandMeal> listAll(){
		return demandmealrepo.findAll();
	}

	@Override
	public DemandMeal createOrderMeal(CreateDemandMealDTO demandmealDTO,String username) {
		Table table=tableservice.findTable(demandmealDTO.getIdTable());
		Assert.notNull(table, "Table must already exits.");
		User user=userservice.findUserByUsername(username);
		Assert.notNull(user, "User must already exits.");
		Restaurant restaurant=table.getIdRestaurant();
		LocalDate date=LocalDate.now();
		LocalTime time=LocalTime.now();
		
		List<Meal> meals=new ArrayList<Meal>();
		for(Long id:demandmealDTO.getIdMeals()) {
			Meal meal=mealservice.findMealByIdMeal(id);
			Assert.notNull(meal,"Non existing meal was given.");
			meals.add(meal);
		}
		Assert.isTrue(meals.size()>0,"No meals are recognized");
		double price=0;
		for(Meal meal:meals) {
			price=price+meal.getMealPrice();
		}
		
		Status status=Status.priprema;
		DemandMeal demandmeal=new DemandMeal(status,price,date,
				time,table,user,meals);
		Assert.notNull(demandmeal, "Order object must be given");
		Assert.isNull(demandmeal.getIdOrder(),"Order ID must be null, not"+demandmeal.getIdOrder());
	
		return demandmealrepo.save(demandmeal);
		
		
	}

	@Override
	public void DeleteAll() {
		demandmealrepo.deleteAll();
		
	}

	@Override
	public DemandMeal updateDemandMeal(DemandMeal demandmeal) {
		return demandmealrepo.save(demandmeal);
	}

	@Override
	public void deleteById(Long id) {
		List<DemandMeal> demandmeals;
		mealreviewservice.deleteByOrder(id);
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			if(demandmeal.getIdOrder()==id) demandmealrepo.delete(demandmeal);
		}
	}

	@Override
	public void deleteByUser(Long id) {
		List<DemandMeal> demandmeals;
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			User user=demandmeal.getIdUser();
			if(user.getIdUser()==id) demandmealrepo.delete(demandmeal);
		}	
	}

	@Override
	public void deleteByTable(Long id) {
		List<DemandMeal> demandmeals;
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			Table table=demandmeal.getIdTable();
			if(table.getIdTable()==id) this.deleteById(demandmeal.getIdOrder());
		}	
	}

	@Override
	public DemandMeal findDemandMealById(Long id) {
		List<DemandMeal> demandmeals;
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			if(demandmeal.getIdOrder()==id) return demandmeal;
		}
		return null;
	}

	@Override
	public List<DemandMeal> findDemandMealByTable(Long id) {
		List<DemandMeal> demandmeals;
		List<DemandMeal> search=new ArrayList<DemandMeal>();
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			Table table=demandmeal.getIdTable();
			if(table.getIdTable()==id) search.add(demandmeal);
		}	
		return search;
	}

	@Override
	public List<DemandMeal> findDemandMealByUser(String username) {
		List<DemandMeal> demandmeals;
		List<DemandMeal> search=new ArrayList<DemandMeal>();
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			User user=demandmeal.getIdUser();
			if(user.getUserName().equals(username)) search.add(demandmeal);
		}	
		return search;
	}

	@Override
	public void lockDemandMeal(Long idOrder) {
		DemandMeal order=this.findDemandMealById(idOrder);
		order.setStatus(Status.gotova);
		demandmealrepo.save(order);
		
		
	}

	@Override
	public List<DemandMeal> findDemandMealByRestaurant(Long idRestaurant) {
		List<DemandMeal> demandmeals;
		List<DemandMeal> search=new ArrayList<DemandMeal>();
		demandmeals=demandmealrepo.findAll();
		for(DemandMeal demandmeal:demandmeals) {
			Restaurant restaurant=demandmeal.getIdTable().getIdRestaurant();
			if(restaurant.getIdRestaurant().equals(idRestaurant)) search.add(demandmeal);
		}	
		return search;
	}

	@Override
	public HashSet<Integer> getAvailableYearsByRestaurant(String nameRestaurant) {
		List<DemandMeal> all=this.listAll();
		HashSet<Integer> years=new HashSet<Integer>();
		for(DemandMeal order:all) {
			if(order.getIdTable().getIdRestaurant().getNameRestaurant().equals(nameRestaurant)) {
				LocalDate date=order.getDateOrder();
				int year=date.getYear();
				years.add(year);
			}
			
		}
		return years;
	}

	@Override
	public List<DemandMeal> getStatisticRestaurant(StatisticsRestaurantDTO data) {
		List<DemandMeal> all=this.listAll();
		List<DemandMeal> search= new ArrayList<DemandMeal>();
		for(DemandMeal order:all) {
			LocalDate date=order.getDateOrder();
			int year=date.getYear();
			int month=date.getMonthValue();
			Long idRestaurant=order.getIdTable().getIdRestaurant().getIdRestaurant();
			if(year==data.getYear() && month==data.getMonth() && idRestaurant==data.getIdRestaurant()) {
				search.add(order);
			}
		}
		return search;
	}

}
