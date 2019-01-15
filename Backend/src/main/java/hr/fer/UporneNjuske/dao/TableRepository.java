package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;


import hr.fer.UporneNjuske.domain.Table;

public interface TableRepository extends JpaRepository<Table,Long> {

}
