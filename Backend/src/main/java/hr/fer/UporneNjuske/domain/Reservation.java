package hr.fer.UporneNjuske.domain;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
public class Reservation {
	public Reservation() {
		super();
	}
	
	public Reservation(String dateReservation, String timeReservation, Table idTable, User idUser) {
		this.dateReservation = dateReservation;
		this.timeReservation = timeReservation;
		this.idTable = idTable;
		this.idUser = idUser;
	}

	@Id
	@GeneratedValue
	private Long idReservation;
	
	@NotNull
	private String dateReservation;
	
	@NotNull
	private String timeReservation;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idTable")
	private Table idTable;
	
	@ManyToOne(optional = false)
	@JoinColumn(name="idUser")
	private User idUser;

	//getters and setters
	public Long getIdReservation() {
		return idReservation;
	}

	

	public Table getIdTable() {
		return idTable;
	}

	public User getIdUser() {
		return idUser;
	}

	public void setIdReservation(Long idReservation) {
		this.idReservation = idReservation;
	}

	

	public void setIdTable(Table idTable) {
		this.idTable = idTable;
	}

	public void setIdUser(User idUser) {
		this.idUser = idUser;
	}

	public String getDateReservation() {
		return dateReservation;
	}

	public void setDateReservation(String dateReservation) {
		this.dateReservation = dateReservation;
	}

	public String getTimeReservation() {
		return timeReservation;
	}

	public void setTimeReservation(String timeReservation) {
		this.timeReservation = timeReservation;
	}

}