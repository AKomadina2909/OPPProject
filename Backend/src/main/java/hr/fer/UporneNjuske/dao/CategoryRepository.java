package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.UporneNjuske.domain.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
