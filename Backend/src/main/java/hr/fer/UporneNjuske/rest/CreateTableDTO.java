package hr.fer.UporneNjuske.rest;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import hr.fer.UporneNjuske.domain.Restaurant;

public class CreateTableDTO {
	private int capacity;
	
	
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	

}
