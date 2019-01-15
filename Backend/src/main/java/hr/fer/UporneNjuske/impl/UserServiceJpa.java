package hr.fer.UporneNjuske.impl;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.UserRepository;
import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.Reservation;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.RestaurantReview;
import hr.fer.UporneNjuske.domain.Role;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.AccountUserDetailsService;
import hr.fer.UporneNjuske.rest.ChangeRoleUserDTO;
import hr.fer.UporneNjuske.rest.LoginDTO;
import hr.fer.UporneNjuske.rest.WebSecurity;

@Service
public class UserServiceJpa implements UserService {
	@Autowired
	private UserRepository userrepo;
	
	@Autowired
	private DemandMealService demandmealservice;
	
	@Autowired
	private ReservationService reservationservice;
	
	@Autowired
	private MealReviewService mealreviewservice;
	
	@Autowired
	private RestaurantReviewService restaurantreviewservice;
	
	@Autowired
	private RestaurantService restaurantservice;
	
	@Override
	public List<User> listAll(){
		return userrepo.findAll();
	}

	@Override
	public User createUser(User user) {
		Assert.notNull(user, "User review object must be given");
		Assert.isNull(user.getIdUser(),"User review ID must be null, not"+user.getIdUser());
		
		String username=user.getUserName();
		if(userrepo.countByuserName(username)>0) {
			throw new RequestDeniedException("User with username "+username+" already exists.");
		}
		Assert.hasText(username,"Username must be given.");
		Assert.isTrue(username.length()<=20,"Username must be between 1 and 20 characters");
		
		String password=user.getPassword();
		Assert.hasText(password,"User password must be given.");
		Assert.isTrue(password.length()<=20,"Password must be between 1 and 20 characters");
		
		String name=user.getName();
		Assert.hasText(name,"User name must be given.");
		Assert.isTrue(name.length()<=30,"User name must be between 1 and 30 characters");
		
		String surname=user.getSurname();
		Assert.hasText(surname,"User surname must be given.");
		Assert.isTrue(surname.length()<=30,"User surname must be between 1 and 30 characters");
		
		String mobilephone=user.getMobilePhone();
		if(mobilephone!=null)Assert.isTrue(mobilephone.length()<=20,"User mobile phone number must be between 1 and 20 characters");
		
		String city=user.getCity();
		if(city!=null)Assert.isTrue(city.length()<=30,"User city must be between 1 and 30 characters");
		
		String adress=user.getAdress();
		if(adress!=null)Assert.isTrue(adress.length()<=45,"User adress must be between 1 and 45 characters");
		
		String email=user.getEmail();
		Assert.hasText(email,"User email must be given.");
		Assert.isTrue(email.length()<=45,"User email must be between 1 and 45 characters");
		
		Role role=user.getRole();
		if(role==null) user.setRole(Role.klijent);
		
		String creditcard=user.getCreditCard();
		Assert.hasText(creditcard,"User credit card number must be given.");
		Assert.isTrue(creditcard.length()<=20,"User credit card number must be between 1 and 20 characters");
		
		return userrepo.save(user);
	}

	@Override
	public void DeleteAll() {
		userrepo.deleteAll();
		
	}

	@Override
	public User findUserByUsername(String userName) {
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getUserName().equals(userName)) return user;
		}
		Assert.isTrue(1!=1,"Nije pronađen niti jedan korisnik");
		return null;
	}

	@Override
	public User findUserById(Long id) {
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getIdUser()==id) return user;
		}
		return null;
	}

	@Override
	public List<User> findUserByRestaurant(Long id) {
		List<User> users;
		List<User> searchUsers=new ArrayList<User>();
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getRole().equals(Role.vlasnik) || user.getRole().equals(Role.zaposlenik) || user.getRole().equals(Role.administrator)) {
				Restaurant tmp=user.getIdRestaurant();
				if(tmp==null) continue;
				if(tmp.getIdRestaurant().equals(id)) searchUsers.add(user);
			}
		}
		return searchUsers;
	}

	@Override
	public void deleteById(Long id) {
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getIdUser()==id) userrepo.delete(user);
		}
		
	}

	@Override
	public void deleteByUserName(String userName) {
		List<DemandMeal> orders=demandmealservice.findDemandMealByUser(userName);
		List<MealReview> mealreviews=mealreviewservice.findByUser(userName);
		List<RestaurantReview> restaurantreviews=restaurantreviewservice.findByUser(userName);
		List<Reservation> reservations=reservationservice.findReservationByUserName(userName);
		User current=this.findUserByUsername(userName);
		for(MealReview review:mealreviews) {
			mealreviewservice.deleteById(review.getIdMealReview());
		}
		for(RestaurantReview review:restaurantreviews) {
			restaurantreviewservice.deleteById(review.getIdRestaurantReview());
		}
		for(Reservation reservation:reservations) {
			reservationservice.deleteById(reservation.getIdReservation());
		}
		for(DemandMeal order:orders) {
			demandmealservice.deleteById(order.getIdOrder());
		}
		
		
		userrepo.delete(current);
	
	}

	@Override
	public void deleteByRestaurant(Long id) {
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			Restaurant tmp=user.getIdRestaurant();
			if(tmp.getIdRestaurant()==id) userrepo.delete(user);
		}
		
	}

	@Override
	public User updateUser(User user) {
		
		
		String password=user.getPassword();
		Assert.hasText(password,"User password must be given.");
		Assert.isTrue(password.length()<=20,"Password must be between 1 and 20 characters");
		
		String name=user.getName();
		Assert.hasText(name,"User name must be given.");
		Assert.isTrue(name.length()<=30,"User name must be between 1 and 30 characters");
		
		String surname=user.getSurname();
		Assert.hasText(surname,"User surname must be given.");
		Assert.isTrue(surname.length()<=30,"User surname must be between 1 and 30 characters");
		
		String mobilephone=user.getMobilePhone();
		if(mobilephone!=null)Assert.isTrue(mobilephone.length()<=20,"User mobile phone number must be between 1 and 20 characters");
		
		String city=user.getCity();
		if(city!=null)Assert.isTrue(city.length()<=30,"User city must be between 1 and 30 characters");
		
		String adress=user.getAdress();
		if(adress!=null)Assert.isTrue(adress.length()<=45,"User adress must be between 1 and 45 characters");
		
		String email=user.getEmail();
		Assert.hasText(email,"User email must be given.");
		Assert.isTrue(email.length()<=45,"User email must be between 1 and 45 characters");
		
		Role role=user.getRole();
		if(role==null) user.setRole(Role.klijent);
		
		String creditcard=user.getCreditCard();
		Assert.hasText(creditcard,"User credit card number must be given.");
		Assert.isTrue(creditcard.length()<=20,"User credit card number must be between 1 and 20 characters");
		
		return userrepo.save(user);
	}

	@Override
	public void hireUser(String username,String ownername) {
		User employee=new User();
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getRole()!=Role.klijent) continue;
			if(user.getUserName().equals(username)) employee=user;
		}
		Assert.notNull(employee,"User with this username does not exist.");
		employee.setRole(Role.zaposlenik);
		
		User owner=new User();
		for(User user:users) {
			if(user.getUserName().equals(ownername)) owner=user;
		}
		Assert.notNull(owner,"Owner with this username does not exist.");
		Restaurant restaurant=owner.getIdRestaurant();
		Assert.notNull(restaurant,"Logged user is not an owner");
		employee.setIdRestaurant(owner.getIdRestaurant());
		userrepo.save(employee);
	}

	@Override
	public User login(LoginDTO data) {
		String username=data.getUserName();
		String password=data.getPassword();
		org.springframework.security.core.userdetails.User u=new org.springframework.security.core.userdetails.User(username, password, authorities(username));
		//SecurityContextHolder.getContext().setAuthentication(u);
		User user=this.findUserByUsername(username);
		Assert.notNull(user,"Wrong user data");
		boolean flag=password.equals(user.getPassword());
		Assert.isTrue(flag,"Wrong password entered");
		return user;
	}

	@Override
	public void fireUser(String username, String ownername) {
		User employee=new User();
		List<User> users;
		users=userrepo.findAll();
		for(User user:users) {
			if(user.getUserName().equals(username)) employee=user;
		}
		Assert.notNull(employee,"User with this username does not exist.");
		employee.setRole(Role.klijent);
		employee.setIdRestaurant(null);
		userrepo.save(employee);
		
	}

	@Override
	public void changeRole(ChangeRoleUserDTO data) {
		User user=this.findUserByUsername(data.getUsername());
		user.setRole(data.getRole());
		userrepo.save(user);
		
		
	}
	
	public List<GrantedAuthority> authorities (String username){
		hr.fer.UporneNjuske.domain.User user=this.findUserByUsername(username);
		if(user==null) throw new UsernameNotFoundException("No user " + username);
		if(user.getRole().equals(Role.administrator)) {
			return (commaSeparatedStringToAuthorityList("ROLE_ADMIN"));
		}else if(user.getRole().equals(Role.klijent)) {
			return (commaSeparatedStringToAuthorityList("ROLE_CLIENT"));
		}else if(user.getRole().equals(Role.vlasnik)) {
			return (commaSeparatedStringToAuthorityList("ROLE_OWNER"));
		}else if(user.getRole().equals(Role.zaposlenik)) {
			return (commaSeparatedStringToAuthorityList("ROLE_EMPLOYEE"));
		}else throw new UsernameNotFoundException("No user " + username);
	}

	@Override
	public List<User> listClients() {
		List<User> all=userrepo.findAll();
		List<User> search=new ArrayList<User>();
		for(User user:all) {
			if(user.getRole().equals(Role.klijent)) {
				search.add(user);
			}
		}
		return search;
	}

	@Override
	public HashMap<String, Integer> getNumberOrdersByUser() {
		List<DemandMeal> allorders=demandmealservice.listAll();
		List<User> allclients=this.listClients();
		HashMap<String,Integer> mapa=new HashMap<String,Integer>();
		for(User client:allclients) {
			mapa.put(client.getUserName(), 0);
		}
		for(DemandMeal order:allorders) {
			User user=order.getIdUser();
			Integer count=mapa.get(user.getUserName());
			count++;
			mapa.put(user.getUserName(),count);
		}
		return mapa;
	}
	



	

	

}
