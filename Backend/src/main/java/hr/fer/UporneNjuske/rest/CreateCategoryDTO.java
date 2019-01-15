package hr.fer.UporneNjuske.rest;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import hr.fer.UporneNjuske.domain.Restaurant;

public class CreateCategoryDTO {
	private String nameCategory;
	
	
	public String getNameCategory() {
		return nameCategory;
	}
	public void setNameCategory(String nameCategory) {
		this.nameCategory = nameCategory;
	}
	
	
}
