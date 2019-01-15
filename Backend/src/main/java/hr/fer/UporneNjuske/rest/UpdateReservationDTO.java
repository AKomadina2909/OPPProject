package hr.fer.UporneNjuske.rest;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;

public class UpdateReservationDTO {
	private Long idReservation;
	private String dateReservation;
	
	public Long getIdReservation() {
		return idReservation;
	}
	public void setIdReservation(Long idReservation) {
		this.idReservation = idReservation;
	}
	public String getDateReservation() {
		return dateReservation;
	}
	public void setDateReservation(String dateReservation) {
		this.dateReservation = dateReservation;
	}
	

}
