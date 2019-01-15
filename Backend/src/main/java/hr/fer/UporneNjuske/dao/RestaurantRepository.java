package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;


import hr.fer.UporneNjuske.domain.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
	int countByLocation(String location);
	int countByOib(String Oib);
	int countByIban(String Iban);
	void delete(Restaurant restaurant);

}
