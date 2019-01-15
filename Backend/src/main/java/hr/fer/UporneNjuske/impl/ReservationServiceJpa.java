package hr.fer.UporneNjuske.impl;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.ReservationRepository;
import hr.fer.UporneNjuske.domain.Reservation;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateReservationDTO;
import hr.fer.UporneNjuske.rest.DeleteSelectedReservationDTO;
import hr.fer.UporneNjuske.rest.UpdateReservationDTO;

@Service
public class ReservationServiceJpa implements ReservationService {
	@Autowired
	private ReservationRepository reservationrepo;
	
	@Autowired
	private TableService tableservice;
	
	@Autowired
	private UserService userservice;
	
	@Override
	public List<Reservation> listAll(){
		return reservationrepo.findAll();
	}

	@Override
	public Reservation createReservation(CreateReservationDTO reservationDTO,String username) {
		User user=userservice.findUserByUsername(username);
		Assert.notNull(user, "User logged in is not valid.");
		
		Assert.notNull(reservationDTO.getIdTable(),"Table id must be given.");
		Table table=tableservice.findTable(reservationDTO.getIdTable());
		Assert.notNull(table, "Table must already exist.");
		
		String[] array=reservationDTO.getDateReservation().split("T");
		String date=array[0];
		String time=array[1].substring(0, 8);
		
		Reservation reservation=new Reservation(date,time,table,user);
		Assert.notNull(reservation, "Reservation object must be given");
		Assert.isNull(reservation.getIdReservation(),"Reservation ID must be null, not"+reservation.getIdReservation());
		
		Assert.notNull(date,"Reservation date must be given.");
		Assert.notNull(time,"Reservation time must be given.");
		return reservationrepo.save(reservation);
	}

	@Override
	public void DeleteAll() {
		reservationrepo.deleteAll();
		
	}


	@Override
	public void deleteById (Long id) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			if (reservation.getIdReservation() == id) reservationrepo.delete(reservation);
		}
	}

	@Override
	public void deleteByUserId(Long Userid) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			User tmp=reservation.getIdUser();
			if (tmp.getIdUser() == Userid) reservationrepo.delete(reservation);
		}
	}

	@Override
	public void deleteByTableId(Long Tableid) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			Table tmp=reservation.getIdTable();
			if (tmp.getIdTable() == Tableid) reservationrepo.delete(reservation);
		}
	}

	@Override
	public void deleteByTime(String time) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			if (reservation.getTimeReservation() == time) reservationrepo.delete(reservation);
		}
	}

	@Override
	public Reservation findReservationById(Long id) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			if (reservation.getIdReservation() == id) return reservation;
		}
		return null;
	}

	@Override
	public List<Reservation> findReservationByTableId(Long Tableid) {
		List<Reservation> reservations;
		List<Reservation> listReservation = new ArrayList<Reservation>();
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			Table tmp=reservation.getIdTable();
			if (tmp.getIdTable().equals(Tableid)) listReservation.add(reservation);
		}
		return listReservation;
	}

	@Override
	public Reservation findReservationByTime(Time time) {
		List<Reservation> reservations;
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			if (reservation.getTimeReservation().equals(time)) return reservation;
		}
		return null;
	}

	@Override
	public List<Reservation> findReservationByUserId(Long Userid) {
		List<Reservation> reservations;
		List<Reservation> listReservation = new ArrayList<Reservation>();
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			User tmp=reservation.getIdUser();
			if (tmp.getIdUser().equals(Userid)) listReservation.add(reservation);
		}
		return listReservation;
	}



	@Override
	public List<Reservation> findReservationByUserName(String userName) {
		List<Reservation> reservations;
		List<Reservation> listReservation = new ArrayList<Reservation>();
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			User tmp=reservation.getIdUser();
			if (tmp.getUserName().equals(userName)) listReservation.add(reservation);
		}
		return listReservation;
	}

	@Override
	public void deleteSelected(DeleteSelectedReservationDTO data) {
		ArrayList<Long> reservations=data.getReservations();
		for(Long id:reservations) {
			this.deleteById(id);
		}
		
	}

	@Override
	public List<Reservation> findReservationByRestaurantId(Long id) {
		List<Reservation> reservations;
		List<Reservation> listReservation = new ArrayList<Reservation>();
		reservations = reservationrepo.findAll();
		for (Reservation reservation : reservations) {
			Restaurant tmp=reservation.getIdTable().getIdRestaurant();
			if (tmp.getIdRestaurant().equals(id)) listReservation.add(reservation);
		}
		return listReservation;
	}

	@Override
	public Reservation updateReservation(UpdateReservationDTO data) {
		Long idReservation=data.getIdReservation();
		Reservation reservation=this.findReservationById(idReservation);
		String[] array=data.getDateReservation().split("T");
		String date=array[0];
		String time=array[1].substring(0, 8);
		reservation.setDateReservation(date);
		reservation.setTimeReservation(time);
		return reservationrepo.save(reservation);
	}
}
