package com.cafe.Wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UserWrapper {

	private Integer id;

	private String name;

	private String email;

	private String contactNumber;

	private String status;

	public UserWrapper() {
		// TODO Auto-generated constructor stub
		System.out.println("UserWrapper");
	}
	
	public UserWrapper(Integer id, String name, String email, String contactNumber, String status) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.contactNumber = contactNumber;
		this.status = status;
	}

}
