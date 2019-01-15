package hr.fer.UporneNjuske.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Meal {
	
	public Meal() {
		super();
	}

	public Meal( String mealName, String details, double mealPrice, Category idCategory) {
		this.mealName = mealName;
		this.details = details;
		this.mealPrice = mealPrice;
		this.idCategory = idCategory;
	}

	
	@Id
	@GeneratedValue
	private Long idMeal;
	
	@NotNull
	@Size(min=1, max=45)
	private String mealName;
	
	@Column(columnDefinition="LONGVARCHAR")
	private String details;
	
	@NotNull
	private double mealPrice;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idCategory")
	private Category idCategory;
	
	

	
	//getters and setters
	public Long getIdMeal() {
		return idMeal;
	}

	public String getMealName() {
		return mealName;
	}

	public String getDetails() {
		return details;
	}

	public double getMealPrice() {
		return mealPrice;
	}

	public Category getIdCategory() {
		return idCategory;
	}

	public void setIdMeal(Long idMeal) {
		this.idMeal = idMeal;
	}

	public void setMealName(String mealName) {
		this.mealName = mealName;
	}

	public void setDetails(String details) {
		this.details = details;
	}


	public void setMealPrice(double mealPrice) {
		this.mealPrice = mealPrice;
	}

	public void setIdCategory(Category idCategory) {
		this.idCategory = idCategory;
	}



	
	

}
