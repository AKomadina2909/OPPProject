package hr.fer.UporneNjuske.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User {
	@Id
	@GeneratedValue
	private Long idUser;
	
	@Column(unique=true)
	@NotNull
	@Size(min=1, max=20)
	private String userName;
	
	@NotNull
	@Size(min=1, max=20)
	private String password;
	
	@NotNull
	@Size(min=1, max=30)
	private String name;
	
	@NotNull
	@Size(min=1, max=30)
	private String surname;
	
	@Size(min=1, max=20)
	private String mobilePhone;
	
	@Size(min=1, max=30)
	private String city;
	
	@Size(min=1, max=45)
	private String adress;
	
	@NotNull
	@Size(min=1, max=45)
	private String email;
	
	@NotNull
	private Role role;
	
	@NotNull
	@Size(min=1, max=20)
	private String creditCard;
	
	@ManyToOne(optional = true)
	@JoinColumn(name="idRestaurant")
	private Restaurant idRestaurant;
	
    //getters and setters
	public Long getIdUser() {
		return idUser;
	}

	public String getUserName() {
		return userName;
	}

	public String getPassword() {
		return password;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public String getCity() {
		return city;
	}

	public String getAdress() {
		return adress;
	}

	public String getEmail() {
		return email;
	}

	public Role getRole() {
		return role;
	}

	public String getCreditCard() {
		return creditCard;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public void setCreditCard(String creditCard) {
		this.creditCard = creditCard;
	}

	public Restaurant getIdRestaurant() {
		return idRestaurant;
	}

	public void setIdRestaurant(Restaurant idRestaurant) {
		this.idRestaurant = idRestaurant;
	}
	
	

}
