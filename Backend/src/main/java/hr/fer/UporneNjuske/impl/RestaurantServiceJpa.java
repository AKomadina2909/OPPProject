package hr.fer.UporneNjuske.impl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.RestaurantRepository;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Role;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateCategoryDTO;
import hr.fer.UporneNjuske.rest.RestaurantOrderDTO;

@Service
public class RestaurantServiceJpa implements RestaurantService {
	@Autowired
	private RestaurantRepository restaurantrepo;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private DemandMealService demandmealservice;
	
	@Autowired
	private CategoryService categoryservice;
	
	@Autowired
	private TableService tableservice;
	
	@Autowired
	private RestaurantReviewService restaurantreviewservice;

	@Override
	public List<Restaurant> listAll(){
		return restaurantrepo.findAll();
	}

	@Override
	public Restaurant createRestaurant(Restaurant restaurant,String username) {
		User user = userservice.findUserByUsername(username);
		Assert.notNull(user,"Logged in user is not valid.");
		Assert.notNull(restaurant, "Restaurant object must be given");
		Assert.isNull(restaurant.getIdRestaurant(),"Restaurant ID must be null, not"+restaurant.getIdRestaurant());
		
		
		String name=restaurant.getNameRestaurant();
		Assert.hasText(name,"Restaurant name must be given.");
		
		String location=restaurant.getLocation();
		if(restaurantrepo.countByLocation(location)>0) {
			throw new RequestDeniedException("Restaurant on location "+restaurant.getLocation()+" already exists.");
		}
		Assert.hasText(location,"Restaurant location must be given.");
		
		String Oib=restaurant.getOib();
		if(restaurantrepo.countByOib(Oib)>0) {
			throw new RequestDeniedException("Restaurant with Oib "+Oib+" already exists.");
			
		}
		Assert.hasText(Oib,"Restaurant Oib must be given.");
		Assert.isTrue(Oib.length()==11,"Oib must have 11 digits.");
		
		String Iban=restaurant.getIban();
		if(restaurantrepo.countByIban(Iban)>0) {
			throw new RequestDeniedException("Restaurant with Iban "+Iban+" already exists.");
		}
		Assert.hasText(Iban,"Restaurant Iban must be given.");
		Assert.isTrue(Iban.length()==21,"Iban must have 21 digits.");
		
		user.setIdRestaurant(restaurant);
		
		return restaurantrepo.save(restaurant);
	}

	@Override
	public void DeleteAll() {
		restaurantrepo.deleteAll();	
	}

	@Override
	public void deleteById(Long id) {
		Restaurant restaurant=this.findRestaurantById(id);
		tableservice.deleteByRestaurant(id);
		restaurantreviewservice.deleteByRestaurant(id);
		categoryservice.deleteByRestaurant(id);
		List<User> users=userservice.findUserByRestaurant(id);
		String ownername="";
		for(User user:users) {
			if(user.getRole().equals(Role.vlasnik) && user.getIdRestaurant().equals(id)) ownername=user.getUserName();
		}
		for(User user:users) {
			userservice.fireUser(user.getUserName(),ownername );
		}
		restaurantrepo.delete(restaurant);

	}

	@Override
	public Restaurant updateRestaurant(Restaurant restaurant) {
		return restaurantrepo.save(restaurant);
	}

	@Override
	public Restaurant findRestaurantById(Long id) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getIdRestaurant()==id) return restaurant;
		}
		return null;
	}

	@Override
	public Restaurant findRestaurantByLocation(String location) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getLocation().equals(location)) return restaurant;
		}
		return null;
	}

	@Override
	public Restaurant findRestaurantByIban(String iban) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getIban().equals(iban)) return restaurant;
		}
		return null;
	}

	@Override
	public Restaurant findRestaurantByOib(String oib) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getOib().equals(oib)) return restaurant;
		}
		return null;
	}

	@Override
	public void deleteByLocation(String location) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getLocation().equals(location)) restaurantrepo.delete(restaurant);
		}
		
	}

	@Override
	public void deleteByOib(String oib) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getOib().equals(oib)) restaurantrepo.delete(restaurant);
		}
		
	}

	@Override
	public void deleteByIban(String iban) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getIban().equals(iban)) restaurantrepo.delete(restaurant);
		}
		
	}

	@Override
	public Restaurant findRestaurantByName(String name) {
		List<Restaurant> restaurants;
		restaurants=restaurantrepo.findAll();
		for(Restaurant restaurant:restaurants) {
			if(restaurant.getNameRestaurant().equals(name)) return restaurant;
		}
		return null;
	}

	@Override
	public double getMoneyRestaurant(Long idRestaurant) {
		List<DemandMeal> orders=demandmealservice.listAll();
		double income=0;
		for(DemandMeal order:orders) {
			Restaurant restaurant=order.getIdTable().getIdRestaurant();
			if(restaurant.getIdRestaurant().equals(idRestaurant)) {
				income=income+order.getPriceOrder();
			}
		}
		return income;
	}

	@Override
	public HashMap<String, Integer> getOrdersByRestaurant() {
		List<DemandMeal> allorders=demandmealservice.listAll();
		List<Restaurant> allrestaurants=this.listAll();
		HashMap<String,Integer> mapa=new HashMap<String,Integer>();
		for(Restaurant restaurant:allrestaurants) {
			mapa.put(restaurant.getNameRestaurant(), 0);
		}
		for(DemandMeal order:allorders) {
			Restaurant restaurant=order.getIdTable().getIdRestaurant();
			Integer count=mapa.get(restaurant.getNameRestaurant());
			count++;
			mapa.put(restaurant.getNameRestaurant(),count);
		}
		return mapa;
	}

	@Override
	public HashMap<String, Double> getMoneyByRestaurant() {
		List<Restaurant> allrestaurants=this.listAll();
		HashMap<String,Double> mapa=new HashMap<String,Double>();
		for(Restaurant restaurant:allrestaurants) {
			Double income=this.getMoneyRestaurant(restaurant.getIdRestaurant());
			mapa.put(restaurant.getNameRestaurant(), income);
		}
		return mapa;
	}

	@Override
	public HashMap<String, Integer> getOrdersByRestaurantMonth(RestaurantOrderDTO data) {
		HashMap<String,Integer> mapa=new HashMap<String,Integer>();
		Restaurant restaurant = this.findRestaurantByName(data.getNameRestaurant());
		int searchYear=data.getYear();
		List<DemandMeal> orders=demandmealservice.findDemandMealByRestaurant(restaurant.getIdRestaurant());
		for(Integer i=1;i<13;++i) {
			mapa.put(i.toString(),0);
		}
		for(DemandMeal order:orders) {
			LocalDate date=order.getDateOrder();
			Integer year=date.getYear();
			Integer month= date.getMonthValue();
			if(year==searchYear) {
				Integer count=mapa.get(month.toString());
				count++;
				mapa.put(month.toString(),count);
			}
			
		}
		return mapa;
	}

	

	

	

}
