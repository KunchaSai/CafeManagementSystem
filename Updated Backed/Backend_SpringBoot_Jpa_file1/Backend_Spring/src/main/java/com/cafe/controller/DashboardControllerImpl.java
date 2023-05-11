package com.cafe.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.service.DashboardService;

@RestController
public class DashboardControllerImpl  implements DashboardController{

	@Autowired
	 DashboardService dashboardService;
	
	
	@Override
	public ResponseEntity<Map<String, Object>> getCount() {
		
		return dashboardService.getCount();
	}

}