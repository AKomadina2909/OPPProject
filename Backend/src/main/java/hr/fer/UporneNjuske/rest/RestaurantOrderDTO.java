package hr.fer.UporneNjuske.rest;


import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.domain.Status;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;

public class RestaurantOrderDTO {

	private String nameRestaurant;
	private int year;
	
	public String getNameRestaurant() {
		return nameRestaurant;
	}
	public void setNameRestaurant(String nameRestaurant) {
		this.nameRestaurant = nameRestaurant;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	
	
	
	
	
	
	
}
