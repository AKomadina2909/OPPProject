package hr.fer.UporneNjuske.rest;

public class UpdateRestaurantReviewDTO {
	private Long idRestaurantReview;
	private String reply;
	public Long getIdRestaurantReview() {
		return idRestaurantReview;
	}
	public void setIdRestaurantReview(Long idRestaurantReview) {
		this.idRestaurantReview = idRestaurantReview;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	
	

}
