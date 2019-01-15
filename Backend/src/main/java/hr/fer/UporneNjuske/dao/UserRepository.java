package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;


import hr.fer.UporneNjuske.domain.User;

public interface UserRepository extends JpaRepository<User,Long> {
	int countByuserName(String userName);

}
