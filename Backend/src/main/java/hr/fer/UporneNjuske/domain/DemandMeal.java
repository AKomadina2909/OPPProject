package hr.fer.UporneNjuske.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class DemandMeal {
	
	public DemandMeal() {
		super();
	}
	
	public DemandMeal(Status status, double priceOrder, LocalDate dateOrder,
			LocalTime timeOrder, Table idTable, User idUser, List<Meal> meals) {
		
		this.status = status;
		this.priceOrder = priceOrder;
		this.dateOrder = dateOrder;
		this.timeOrder = timeOrder;
		this.idTable = idTable;
		this.idUser = idUser;
		this.meals = meals;
	}

	@Id
	@GeneratedValue
	private Long idOrder;
	
	@NotNull
	private Status status;
	
	@NotNull
	private double priceOrder;
	
	@NotNull
	private LocalDate dateOrder;
	
	@NotNull
	private LocalTime timeOrder;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idTable")
	private Table idTable;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idUser")
	private User idUser;
	
	@ManyToMany
	private List<Meal> meals;

	//getters and setters
	public Long getIdOrder() {
		return idOrder;
	}

	public Status getStatus() {
		return status;
	}

	public double getPriceOrder() {
		return priceOrder;
	}

	

	public Table getIdTable() {
		return idTable;
	}

	public User getIdUser() {
		return idUser;
	}

	public void setIdOrder(Long idOrder) {
		this.idOrder = idOrder;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public void setPriceOrder(double priceOrder) {
		this.priceOrder = priceOrder;
	}

	

	public void setIdTable(Table idTable) {
		this.idTable = idTable;
	}

	public void setIdUser(User idUser) {
		this.idUser = idUser;
	}

	public LocalDate getDateOrder() {
		return dateOrder;
	}

	public void setDateOrder(LocalDate dateOrder) {
		this.dateOrder = dateOrder;
	}

	public LocalTime getTimeOrder() {
		return timeOrder;
	}

	public void setTimeOrder(LocalTime timeOrder) {
		this.timeOrder = timeOrder;
	}

	public List<Meal> getMeals() {
		return meals;
	}

	public void setMeals(List<Meal> meals) {
		this.meals = meals;
	}

	

	




	
	

}
