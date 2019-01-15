package hr.fer.UporneNjuske.rest;

public class CreateMealDTO {
	private String mealName;
	private String details;
	private double mealPrice;
	private Long idCategory;
	
	public String getMealName() {
		return mealName;
	}
	public String getDetails() {
		return details;
	}

	public double getMealPrice() {
		return mealPrice;
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
	public Long getIdCategory() {
		return idCategory;
	}
	public void setIdCategory(Long idCategory) {
		this.idCategory = idCategory;
	}
	

}
