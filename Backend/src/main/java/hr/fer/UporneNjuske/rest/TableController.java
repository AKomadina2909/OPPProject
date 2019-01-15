package hr.fer.UporneNjuske.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Table;
import hr.fer.UporneNjuske.impl.TableService;


@RestController
@RequestMapping("/tables")
public class TableController {
    @Autowired
    private TableService tableService;

    @GetMapping("")
    public List<Table> listtables() {
        return tableService.listAll();
    }

    @GetMapping("/id/{id}")
    public @ResponseBody
    Table getById(@PathVariable Long id) {
        return tableService.findTable(id);
    }

    

    @GetMapping("/capacity/{capacity}")
    public @ResponseBody
    List<Table> getByCapacity(@PathVariable int capacity) {
        return tableService.findTablesByCapacity(capacity);
    }
    @GetMapping("/restaurant/{nameRestaurant}")
    public @ResponseBody
    List<Table> getByRestaurant(@PathVariable String nameRestaurant) {
        return tableService.findTableByRestaurant(nameRestaurant);
    }

    @PostMapping("")
    @Secured("ROLE_OWNER")
    public Table createTable(@RequestBody CreateTableDTO table, @AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
        return tableService.createTable(table, u.getUsername());
    }
    @PostMapping("/update")
    @Secured("ROLE_OWNER")
    public Table updateTable(@RequestBody UpdateTableDTO table) {
        return tableService.updateTable(table);
    }


    @DeleteMapping("/capacity/{capacity}")
    @Secured("ROLE_OWNER")
    public void deleteByCapacity(@PathVariable int capacity) {
        tableService.deleteByCapacity(capacity);
    }
    @DeleteMapping("/restaurant/{idRestaurant}")
    @Secured("ROLE_OWNER")
    public void deleteByRestaurant(@PathVariable Long idRestaurant) {
        tableService.deleteByRestaurant(idRestaurant);
    }

    @DeleteMapping("")
    @Secured("ROLE_OWNER")
    public void deleteTables() {
        tableService.DeleteAll();
    }
    
    @DeleteMapping("/id/{id}")
    @Secured("ROLE_OWNER")
    public void deleteById(@PathVariable Long id) {
        tableService.deleteTableById(id);
    }
    
   
  
}
