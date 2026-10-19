package com.mkg.gmall.DTO;


public class ReturnUserData {

	private String userId;
	private String fullName;
	private String email;
	private String phone;
	private String role;
	private String profileImage;
	private String status;
	private String joinedDate;
	
	public ReturnUserData(String userId, String fullName, String email, String phone, String role,
			String profileImage,String status,String joinedDate) {
		super();
		this.userId = userId;
		this.fullName = fullName;
		this.email = email;
		this.phone = phone;
		this.role = role;
		this.profileImage = profileImage;
		this.status = status;
		this.joinedDate=joinedDate;
	}

	public String getUserId() {
		return userId;
	}

	public String getFullName() {
		return fullName;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}

	public String getRole() {
		return role;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public String getStatus() {
		return status;
	}

	public String getJoinedDate() {
		return joinedDate;
	}
	
	
	
	

}
