package hr.fer.UporneNjuske.rest;

import hr.fer.UporneNjuske.domain.Role;

public class ChangeRoleUserDTO {
	private String username;
	private Role role;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	

}
