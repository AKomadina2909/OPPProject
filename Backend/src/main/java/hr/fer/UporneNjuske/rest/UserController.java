package hr.fer.UporneNjuske.rest;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.Restaurant;
import hr.fer.UporneNjuske.domain.Role;
import hr.fer.UporneNjuske.domain.User;
import hr.fer.UporneNjuske.impl.UserService;


@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/info")
	public String info(){
		org.springframework.security.core.userdetails.User u;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		String authority=authentication.getAuthorities().toString();
		
		return currentPrincipalName+authority;
		
	}
	@GetMapping("/clients")
	@Secured("ROLE_ADMIN")
	public List<User> clients(){
		return userService.listClients();
		
	}
	
	@GetMapping("")
	@Secured("ROLE_ADMIN")
	public List<User> listusers(){
		return userService.listAll();
	}
	@PostMapping("/login")
	@Secured({"ROLE_ADMIN","ROLE_EMPLOYEE","ROLE_OWNER","ROLE_CLIENT"})
	public User LoggedinUser(@RequestBody LoginDTO data) {
		return userService.login(data);
	}
	
	@GetMapping("/username")
	@Secured({"ROLE_ADMIN","ROLE_EMPLOYEE","ROLE_OWNER","ROLE_CLIENT"})
	public User getByUsername(@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
	    return userService.findUserByUsername(u.getUsername());
	}
	@GetMapping("/id/{id}")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public User getById(@PathVariable("id") Long id) {
	    return userService.findUserById(id);
	}
	@GetMapping("/restaurant/{restaurantId}")
	@Secured({"ROLE_ADMIN","ROLE_OWNER"})
	public List<User> getByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
	    return userService.findUserByRestaurant(restaurantId);
	}
	@GetMapping("/ordersByUser")
	@Secured({"ROLE_ADMIN"})
	public HashMap<String,Integer> getNumberOrdersByUser() {
	    return userService.getNumberOrdersByUser();
	}
	@PostMapping("")
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}
	@PostMapping("/update")
	public User updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
	
	@PostMapping("/changeRole")
	@Secured("ROLE_ADMIN")
	public void changeUserRole(@RequestBody ChangeRoleUserDTO user) {
		userService.changeRole(user);
	}
	
	@PostMapping("/hire/{username}")
	@Secured("ROLE_OWNER")
	public void hireUser(@PathVariable("username") String username,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		userService.hireUser(username,u.getUsername());
	}
	@PostMapping("/fire/{username}")
	@Secured("ROLE_OWNER")
	public void fireUser(@PathVariable("username") String username,@AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
		userService.fireUser(username,u.getUsername());
	}
	@DeleteMapping("")
	@Secured("ROLE_ADMIN")
	public void deleteUsers() {
		userService.DeleteAll();
	}
	@DeleteMapping("/id/{id}")
	@Secured("ROLE_ADMIN")
	public void deleteById(@PathVariable("id") Long id) {
	    userService.deleteById(id);
	}
	@DeleteMapping("/username")
	@Secured({"ROLE_ADMIN","ROLE_CLIENT","ROLE_OWNER","ROLE_EMPLOYEE"})
	public void deleteByUsername( @AuthenticationPrincipal org.springframework.security.core.userdetails.User u) {
	    userService.deleteByUserName(u.getUsername());
	}
	@DeleteMapping("/restaurant/{restaurantId}")
	@Secured("ROLE_ADMIN")
	public void deleteByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
	    userService.deleteByRestaurant(restaurantId);
	}
	
	
	

}
