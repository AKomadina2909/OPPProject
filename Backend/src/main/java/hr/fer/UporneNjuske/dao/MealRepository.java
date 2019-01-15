package hr.fer.UporneNjuske.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.UporneNjuske.domain.Category;
import hr.fer.UporneNjuske.domain.Meal;


public interface MealRepository extends JpaRepository<Meal,Long> {
	int countByIdCategory(Category idCategory );
	void delete(Meal meal);
}
