package hr.fer.UporneNjuske.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class Table {
	public Table() {
		super();
	}
	
	public Table(int capacity, Restaurant idRestaurant) {
		this.capacity = capacity;
		this.idRestaurant = idRestaurant;
	}

	@Id
	@GeneratedValue
	private Long idTable;
	
	
	@NotNull
	private int capacity;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idRestaurant")
	private Restaurant idRestaurant;
	
	//getters and setters
	public Long getIdTable() {
		return idTable;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setIdTable(Long idTable) {
		this.idTable = idTable;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public Restaurant getIdRestaurant() {
		return idRestaurant;
	}

	public void setIdRestaurant(Restaurant idRestaurant) {
		this.idRestaurant = idRestaurant;
	}

	
	

}
