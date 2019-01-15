package hr.fer.UporneNjuske.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Category {
	public Category() {
		super();
	}
	
	public Category(String nameCategory, Restaurant idRestaurant) {
		this.nameCategory = nameCategory;
		this.idRestaurant = idRestaurant;
	}

	@Id
	@GeneratedValue
	private Long idCategory;
	
	@NotNull
	@Size(min=1, max=45)
	private String nameCategory;
	
	 @ManyToOne(optional = false)
	 @JoinColumn(name="idRestaurant")
	 private Restaurant idRestaurant;
	 
	 //getters and setters
	public Long getIdCategory() {
		return idCategory;
	}

	public String getNameCategory() {
		return nameCategory;
	}

	public Restaurant getIdRestaurant() {
		return idRestaurant;
	}

	public void setIdCategory(Long idCategory) {
		this.idCategory = idCategory;
	}

	public void setNameCategory(String nameCategory) {
		this.nameCategory = nameCategory;
	}

	public void setIdRestaurant(Restaurant idRestaurant) {
		this.idRestaurant = idRestaurant;
	}

}
