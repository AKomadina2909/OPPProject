package hr.fer.UporneNjuske.rest;

public class StatisticsRestaurantDTO {
	private Long idRestaurant;
	private int year;
	private int month;
	
	public Long getIdRestaurant() {
		return idRestaurant;
	}
	public void setIdRestaurant(Long idRestaurant) {
		this.idRestaurant = idRestaurant;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	
	

}
