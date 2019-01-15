package hr.fer.UporneNjuske.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.RestaurantReviewRepository;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.RestaurantReview;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateRestaurantReviewDTO;
import hr.fer.UporneNjuske.rest.UpdateRestaurantReviewDTO;

@Service
public class RestaurantReviewServiceJpa implements RestaurantReviewService {
	@Autowired
	private RestaurantReviewRepository restaurantreviewrepo;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private RestaurantService restaurantservice;
	
	@Override
	public List<RestaurantReview> listAll(){
		return restaurantreviewrepo.findAll();
	}

	@Override
	public RestaurantReview createRestaurantReview(CreateRestaurantReviewDTO restaurantreviewDTO,String username) {
		User user=userservice.findUserByUsername(username);
		Assert.notNull(user, "Logged in user must be valid.");
		
		Assert.notNull(restaurantreviewDTO.getIdRestaurant(),"Restaurant id must be given");
		Restaurant restaurant=restaurantservice.findRestaurantById(restaurantreviewDTO.getIdRestaurant());
		Assert.notNull(restaurant, "Restaurant must already exist.");
	
		
		RestaurantReview restaurantreview=new RestaurantReview(restaurantreviewDTO.getReview(),restaurantreviewDTO.getDescription(),restaurantreviewDTO.getReply(),
				restaurant,user);
		Assert.notNull(restaurantreview, "Restaurant review object must be given");
		Assert.isNull(restaurantreview.getIdRestaurantReview(),"Restaurant review ID must be null, not"+restaurantreview.getIdRestaurantReview());
		
		int review=restaurantreview.getReview();
		Assert.isTrue((review>=1 && review<=5),"Restaurant review must be between 1 and 5.");
		
		
		
		return restaurantreviewrepo.save(restaurantreview);
	}

	@Override
	public void DeleteAll() {
		restaurantreviewrepo.deleteAll();
		
	}

	@Override
	public void deleteById(Long id) {
		List<RestaurantReview> restaurantReviews;
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			if(restaurantReview.getIdRestaurantReview() == id) {
				restaurantreviewrepo.delete(restaurantReview);
			}
		}
	}

	@Override
	public void deleteByRestaurant(Long idRestaurant) {
		List<RestaurantReview> restaurantReviews;
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			Restaurant restaurant = restaurantReview.getIdRestaurant();
			if(restaurant.getIdRestaurant() == idRestaurant) {
				restaurantreviewrepo.delete(restaurantReview);
			}
		}	
	}

	@Override
	public void deleteByUser(String userName) {
		List<RestaurantReview> restaurantReviews = findByUser(userName);
		for(RestaurantReview restaurantReview : restaurantReviews) {
			User user = restaurantReview.getIdUser();
			if (user.getUserName() == userName) {
				restaurantreviewrepo.delete(restaurantReview);
			}
		}
	}

	@Override
	public RestaurantReview updateRestaurantReview(UpdateRestaurantReviewDTO data) {
		RestaurantReview restaurantreview=this.findById(data.getIdRestaurantReview());
		restaurantreview.setReply(data.getReply());
		return restaurantreviewrepo.save(restaurantreview);
	}

	@Override
	public RestaurantReview findById(Long id) {
		List<RestaurantReview> restaurantReviews;
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			if(restaurantReview.getIdRestaurantReview() == id){
				return restaurantReview;
			}
		}
		return null;
	}

	@Override
	public List<RestaurantReview> findByRestaurant(Long restaurantId) {
		List<RestaurantReview> restaurantReviews;
		List<RestaurantReview> search = new ArrayList<RestaurantReview>();
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			Restaurant restaurant = restaurantReview.getIdRestaurant();
			if(restaurant.getIdRestaurant() == restaurantId) {
				search.add(restaurantReview);
			}
		}	
		return search;
	}

	@Override
	public List<RestaurantReview> findByUser(String userName) {
		List<RestaurantReview> restaurantReviews;
		List<RestaurantReview> search = new ArrayList<RestaurantReview>();
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			User user = restaurantReview.getIdUser();
			if(user.getUserName().equals(userName)) {
				search.add(restaurantReview);
			}
		}	
		return search;
	}

	@Override
	public List<RestaurantReview> findByRestaurantName(String name) {
		List<RestaurantReview> restaurantReviews;
		List<RestaurantReview> search = new ArrayList<RestaurantReview>();
		restaurantReviews = restaurantreviewrepo.findAll();
		for(RestaurantReview restaurantReview : restaurantReviews) {
			Restaurant restaurant = restaurantReview.getIdRestaurant();
			if(restaurant.getNameRestaurant().equals(name)) {
				search.add(restaurantReview);
			}
		}	
		return search;
	}

}
