package hr.fer.UporneNjuske.rest;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.UporneNjuske.domain.Role;
import hr.fer.UporneNjuske.impl.UserService;

@Service
public class AccountUserDetailsService implements UserDetailsService {
	@Autowired
	private UserService userservice;

	
	@Value("${opp.admin.password}")
	private String adminPasswordHash;

	@Override
	public UserDetails loadUserByUsername(String username) {
		return new User(username, userPassword(username), authorities(username));
	}
	
	public List<GrantedAuthority> authorities (String username){
		hr.fer.UporneNjuske.domain.User user=userservice.findUserByUsername(username);
		if(user==null) throw new UsernameNotFoundException("No user " + username);
		if(user.getRole().equals(Role.administrator)) {
			return (commaSeparatedStringToAuthorityList("ROLE_ADMIN"));
		}else if(user.getRole().equals(Role.klijent)) {
			return (commaSeparatedStringToAuthorityList("ROLE_CLIENT"));
		}else if(user.getRole().equals(Role.vlasnik)) {
			return (commaSeparatedStringToAuthorityList("ROLE_OWNER"));
		}else if(user.getRole().equals(Role.zaposlenik)) {
			return (commaSeparatedStringToAuthorityList("ROLE_EMPLOYEE"));
		}else throw new UsernameNotFoundException("No user " + username);
	}
	
	public String userPassword(String username) {
		hr.fer.UporneNjuske.domain.User user=userservice.findUserByUsername(username);
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
		String password = user.getPassword();
		return passwordEncoder.encode(password);
	}


}
