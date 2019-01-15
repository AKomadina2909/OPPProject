package hr.fer.UporneNjuske.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.MealReviewRepository;
import hr.fer.UporneNjuske.domain.MealReview;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.DemandMeal;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateMealReviewDTO;
import hr.fer.UporneNjuske.rest.UpdateMealReviewDTO;

@Service
public class MealReviewServiceJpa implements MealReviewService {
	@Autowired
	private MealReviewRepository mealreviewrepo;
	
	@Autowired
	private UserService userservice;
	
	@Autowired
	private DemandMealService demandmealservice;

	
	@Override
	public List<MealReview> listAll(){
		return mealreviewrepo.findAll();
	}

	@Override
	public MealReview createMealReview(CreateMealReviewDTO mealreviewDTO,String username) {
		User user=userservice.findUserByUsername(username);
		Assert.notNull(user, "Logged in user is not valid.");
		
		Assert.notNull(mealreviewDTO.getIdOrder(),"Order id must be given.");
		DemandMeal demandmeal=demandmealservice.findDemandMealById(mealreviewDTO.getIdOrder());
		Assert.notNull(demandmeal, "Order must already exist.");
		MealReview mealreview=new MealReview(mealreviewDTO.getReview(),mealreviewDTO.getDescription(),mealreviewDTO.getReply(),
				demandmeal,user);
		Assert.notNull(mealreview, "Meal review object must be given");
		Assert.isNull(mealreview.getIdMealReview(),"Meal review ID must be null, not"+mealreview.getIdMealReview());
		
		int review=mealreview.getReview();
		Assert.isTrue((review>=1 && review<=5),"Meal review must be between 1 and 5.");
		
	
		return mealreviewrepo.save(mealreview);
		
	}

	@Override
	public void DeleteAll() {
		mealreviewrepo.deleteAll();
		
	}

	@Override
	public void deleteById(Long id) {
		List<MealReview> mealReviews;
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview : mealReviews) {
			if(mealReview.getIdMealReview() == id) {
				mealreviewrepo.delete(mealReview);
			}
		}
	}

	@Override
	public void deleteByOrder(Long idOrder) {
		List<MealReview> mealReviews;
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview : mealReviews) {
			DemandMeal order = mealReview.getIdOrder();
			if(order.getIdOrder() == idOrder) {
				mealreviewrepo.delete(mealReview);
			}
		}	
	}

	@Override
	public void deleteByUser(String username) {
		List<MealReview> mealReviews = findByUser(username);
		for(MealReview mealReview:mealReviews) {
			User user = mealReview.getIdUser();
			if (user.getUserName().equals(username)) {
				mealreviewrepo.delete(mealReview);
			}
		}		
	}

	@Override
	public MealReview updateMealReview(UpdateMealReviewDTO data) {
		MealReview mealreview=this.findById(data.getIdMealReview());
		mealreview.setReply(data.getReply());
		
		return mealreviewrepo.save(mealreview);
	}

	@Override
	public MealReview findById(Long id) {
		List<MealReview> mealReviews;
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview:mealReviews) {
			if(mealReview.getIdMealReview() == id){
				return mealReview;
			}
		}
		return null;
	}

	@Override
	public List<MealReview> findByOrder(Long idOrder) {
		List<MealReview> mealReviews;
		List<MealReview> search = new ArrayList<MealReview>();
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview:mealReviews) {
			DemandMeal order = mealReview.getIdOrder();
			if(order.getIdOrder() == idOrder) {
				search.add(mealReview);
			}
		}	
		return search;
	}

	@Override
	public List<MealReview> findByUser(String username) {
		List<MealReview> mealReviews;
		List<MealReview> search = new ArrayList<MealReview>();
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview:mealReviews) {
			User user = mealReview.getIdUser();
			if(user.getUserName().equals(username)) {
				search.add(mealReview);
			}
		}	
		return search;
	}

	@Override
	public List<MealReview> findByRestaurant(Long idRestaurant) {
		List<MealReview> mealReviews;
		List<MealReview> search = new ArrayList<MealReview>();
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview:mealReviews) {
			Restaurant restaurant=mealReview.getIdOrder().getIdTable().getIdRestaurant();
			if(restaurant.getIdRestaurant().equals(idRestaurant)) {
				search.add(mealReview);
			}
		}	
		return search;
	}

	@Override
	public List<MealReview> findByRestaurantName(String name) {
		List<MealReview> mealReviews;
		List<MealReview> search = new ArrayList<MealReview>();
		mealReviews = mealreviewrepo.findAll();
		for(MealReview mealReview:mealReviews) {
			Restaurant restaurant=mealReview.getIdOrder().getIdTable().getIdRestaurant();
			if(restaurant.getNameRestaurant().equals(name)) {
				search.add(mealReview);
			}
		}	
		return search;
	}

}
