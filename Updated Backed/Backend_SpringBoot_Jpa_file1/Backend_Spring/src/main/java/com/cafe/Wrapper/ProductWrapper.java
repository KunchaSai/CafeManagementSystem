package com.cafe.Wrapper;

import lombok.Data;

@Data
public class ProductWrapper {
	Integer id;
	String name;
	String description;
	Integer price;
	String status;
	String image;
	Integer categoryId;
	String categoryName;

	public ProductWrapper() {
	}

	public ProductWrapper(Integer id, String name, String description, Integer price, String status, String image, Integer categoryId,
			String categoryName) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.status = status;
		this.image = image;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

	public ProductWrapper(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public ProductWrapper(Integer id, String name, String description, Integer price, String image) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.image=image;

	}
}