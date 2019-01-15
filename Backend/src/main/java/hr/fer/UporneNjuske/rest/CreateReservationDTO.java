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

public class CreateReservationDTO {
	private String dateReservation;
	private String timeReservation;
	public String getTimeReservation() {
		return timeReservation;
	}
	public void setTimeReservation(String timeReservation) {
		this.timeReservation = timeReservation;
	}
	private Long idTable;
	
	
	
	public Long getIdTable() {
		return idTable;
	}
	public void setIdTable(Long idTable) {
		this.idTable = idTable;
	}
	public String getDateReservation() {
		return dateReservation;
	}
	public void setDateReservation(String dateReservation) {
		this.dateReservation = dateReservation;
	}
	

}
