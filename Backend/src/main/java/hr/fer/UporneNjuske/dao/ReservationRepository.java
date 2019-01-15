package hr.fer.UporneNjuske.dao;


import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.UporneNjuske.domain.Reservation;

import java.sql.Time;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
}
