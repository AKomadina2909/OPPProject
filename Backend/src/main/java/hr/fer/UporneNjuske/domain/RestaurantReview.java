package hr.fer.UporneNjuske.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class RestaurantReview {
	public RestaurantReview(){
		super();
	}
	public RestaurantReview(@NotNull int review, String description, String reply, Restaurant idRestaurant,
			User idUser) {
		this.review = review;
		this.description = description;
		this.reply = reply;
		this.idRestaurant = idRestaurant;
		this.idUser = idUser;
	}

	@Id
	@GeneratedValue
	private Long idRestaurantReview;
	
	
	@NotNull
	private int review;
	
	@Column(columnDefinition="LONGVARCHAR")
	private String description;
	
	@Column(columnDefinition="LONGVARCHAR")
	private String reply;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idRestaurant")
	private Restaurant idRestaurant;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idUser")
	private User idUser;
	
    //getters and setters
	public Long getIdRestaurantReview() {
		return idRestaurantReview;
	}

	public int getReview() {
		return review;
	}

	public String getDescription() {
		return description;
	}

	public String getReply() {
		return reply;
	}

	public Restaurant getIdRestaurant() {
		return idRestaurant;
	}

	public User getIdUser() {
		return idUser;
	}

	public void setIdRestaurantReview(Long idRestaurantReview) {
		this.idRestaurantReview = idRestaurantReview;
	}

	public void setReview(int review) {
		this.review = review;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}

	public void setIdRestaurant(Restaurant idRestaurant) {
		this.idRestaurant = idRestaurant;
	}

	public void setIdUser(User idUser) {
		this.idUser = idUser;
	}

}
