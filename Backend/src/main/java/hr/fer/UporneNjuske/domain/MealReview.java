package hr.fer.UporneNjuske.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class MealReview {
	public MealReview() {
		super();
	}
	public MealReview(int review, String description, String reply, DemandMeal idOrder,
			User idUser) {
		this.review = review;
		this.description = description;
		this.reply = reply;
		this.idOrder = idOrder;
		this.idUser = idUser;
	}

	@Id
	@GeneratedValue
	private Long idMealReview;
	
	@NotNull
	private int review;

	@Column(columnDefinition="LONGVARCHAR")
	private String description;
	
	@Column(columnDefinition="LONGVARCHAR")
	private String reply;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idOrder")
	private DemandMeal idOrder;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idUser")
	private User idUser;

	//getters and setters
	public Long getIdMealReview() {
		return idMealReview;
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


	public User getIdUser() {
		return idUser;
	}

	public void setIdMealReview(Long idMealReview) {
		this.idMealReview = idMealReview;
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


	public void setIdUser(User idUser) {
		this.idUser = idUser;
	}

	public DemandMeal getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(DemandMeal idOrder) {
		this.idOrder = idOrder;
	}
	


}
