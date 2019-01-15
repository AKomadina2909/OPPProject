package hr.fer.UporneNjuske.rest;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.User;

public class CreateRestaurantReviewDTO {
	private int review;
	private String description;
	private String reply;
	private Long idRestaurant;
	
	public int getReview() {
		return review;
	}
	public void setReview(int review) {
		this.review = review;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	public Long getIdRestaurant() {
		return idRestaurant;
	}
	public void setIdRestaurant(Long idRestaurant) {
		this.idRestaurant = idRestaurant;
	}
	
}
