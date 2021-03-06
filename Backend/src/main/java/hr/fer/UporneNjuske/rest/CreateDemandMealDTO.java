package hr.fer.UporneNjuske.rest;


import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import hr.fer.UporneNjuske.domain.Meal;
import hr.fer.UporneNjuske.domain.Status;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;

public class CreateDemandMealDTO {

	private Long idTable;
	private List<Long> idMeals;
	
	public Long getIdTable() {
		return idTable;
	}
	public void setIdTable(Long idTable) {
		this.idTable = idTable;
	}
	public List<Long> getIdMeals() {
		return idMeals;
	}
	public void setIdMeals(List<Long> idMeals) {
		this.idMeals = idMeals;
	}
	
	
	
	
}
