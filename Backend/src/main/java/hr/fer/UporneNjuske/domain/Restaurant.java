package hr.fer.UporneNjuske.domain;

import java.awt.Image;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

@Entity
public class Restaurant {
	@Id
	@GeneratedValue
	private Long idRestaurant;
	
	@NotNull
	@Column(unique=true)
	@Size(min=1, max=45)
	private String nameRestaurant;
	
	@Column(unique=true)
	@NotNull
	@Size(min=1, max=45)
	private String location;
	
	@Size(min=1, max=20)
	private String phoneRestaurant;
	
	@Size(min=1, max=45)
	private String emailRestaurant;
	
	@Size(min=1, max=20)
	private String faxRestaurant;
	
	@NotNull
	private String openingHour;
	
	@NotNull
	private String closingHour;
	
	@Column(columnDefinition="LONGVARCHAR")
	private ArrayList<String> imageRestaurant;
	
	@Column(unique=true)
	@Size(min=11, max=11)
	@NotNull
	private String oib;
	
	@Column(unique=true)
	@Size(min=21, max=21)
	@NotNull
	private String iban;
	
	@NotNull
	private String longitude;
	
	
	@NotNull
	private String latitude;
	
    //getters and setters
	public Long getIdRestaurant() {
		return idRestaurant;
	}

	public String getNameRestaurant() {
		return nameRestaurant;
	}

	public String getLocation() {
		return location;
	}

	public String getPhoneRestaurant() {
		return phoneRestaurant;
	}

	public String getEmailRestaurant() {
		return emailRestaurant;
	}

	public String getFaxRestaurant() {
		return faxRestaurant;
	}


	public ArrayList<String> getImageRestaurant() {
		return imageRestaurant;
	}

	public void setIdRestaurant(Long idRestaurant) {
		this.idRestaurant = idRestaurant;
	}


	public void setNameRestaurant(String nameRestaurant) {
		this.nameRestaurant = nameRestaurant;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setPhoneRestaurant(String phoneRestaurant) {
		this.phoneRestaurant = phoneRestaurant;
	}

	public void setEmailRestaurant(String emailRestaurant) {
		this.emailRestaurant = emailRestaurant;
	}

	public void setFaxRestaurant(String faxRestaurant) {
		this.faxRestaurant = faxRestaurant;
	}


	public void setImageRestaurant(ArrayList<String> imageRestaurant) {
		this.imageRestaurant = imageRestaurant;
	}

	public String getOib() {
		return oib;
	}

	public String getIban() {
		return iban;
	}

	public void setOib(String oib) {
		this.oib = oib;
	}

	public void setIban(String iban) {
		this.iban = iban;
	}

	public String getOpeningHour() {
		return openingHour;
	}

	public void setOpeningHour(String openingHour) {
		this.openingHour = openingHour;
	}

	public String getClosingHour() {
		return closingHour;
	}

	public void setClosingHour(String closingHour) {
		this.closingHour = closingHour;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	
	

}
