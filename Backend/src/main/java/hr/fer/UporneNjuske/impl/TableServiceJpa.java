package hr.fer.UporneNjuske.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.UporneNjuske.dao.TableRepository;
import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.rest.CreateTableDTO;
import hr.fer.UporneNjuske.rest.UpdateTableDTO;

@Service
public class TableServiceJpa implements TableService {
    @Autowired
    private TableRepository tablerepo;
    
    @Autowired
    private ReservationService reservationservice;
    
    @Autowired
    private UserService userservice;
    
    @Autowired
    private DemandMealService demandmealservice;

    @Override
    public List<Table> listAll() {
        return tablerepo.findAll();
    }

    @Override
    public Table createTable(CreateTableDTO tableDTO,String username) {
    	User user=userservice.findUserByUsername(username);
    	Assert.notNull(user,"Logged in user is not valid.");
    	Restaurant restaurant=user.getIdRestaurant();
    	Assert.notNull(restaurant, "Logged in user must be owner.");

    	Table table=new Table(tableDTO.getCapacity(),restaurant);
        Assert.notNull(table, "Table review object must be given");
        Assert.isNull(table.getIdTable(), "Table review ID must be null, not" + table.getIdTable());
        int capacity = table.getCapacity();
        Assert.isTrue(capacity > 0, "Table capacity must be greater than 0");

       
        return tablerepo.save(table);
    }

    @Override
    public Table findTable(Long id) {
        List<Table> tables = tablerepo.findAll();
        for (Table table : tables) {
            if (table.getIdTable() == id) return table;
        }
        return null;
    }

    

    @Override
    public List<Table> findTablesByCapacity(int capacity) {
        List<Table> tables = tablerepo.findAll().stream().filter(p -> p.getCapacity() == capacity).collect(Collectors.toList());
        return (tables == null || tables.isEmpty()) ? null : tables;
    }

    @Override
    public void deleteTableById(Long tableId) {
    	demandmealservice.deleteByTable(tableId);
    	reservationservice.deleteByTableId(tableId);
    
        List<Table> tables=tablerepo.findAll();
        for(Table table:tables) {
        	if(table.getIdTable().equals(tableId)) tablerepo.delete(table);
        }
    }

    

    @Override
    public void deleteByCapacity(int capacity) {
        tablerepo.findAll().removeIf(p -> p.getCapacity() == capacity);
    }

    @Override
    public void DeleteAll() {
        tablerepo.deleteAll();

    }



	@Override
	public void deleteByRestaurant(Long id) {
		List<Table> tables;
		tables=tablerepo.findAll();
		for(Table table:tables) {
			Restaurant tmp=table.getIdRestaurant();
			if(tmp.getIdRestaurant()==id) this.deleteTableById(table.getIdTable());;
		}
		
	}

	

	@Override
	public List<Table> findTableByRestaurant(String nameRestaurant) {
		List<Table> tables;
		List<Table> search=new ArrayList<Table>();
		tables=tablerepo.findAll();
		for(Table table:tables) {
			Restaurant tmp=table.getIdRestaurant();
			if(tmp.getNameRestaurant().equals(nameRestaurant)) search.add(table);
		}
		return search;
	}

	@Override
	public Table updateTable(UpdateTableDTO data) {
		Table table=this.findTable(data.getIdTable());
		table.setCapacity(data.getCapacity());
		tablerepo.save(table);
		return table;
	}

}
