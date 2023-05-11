package com.cafe.service;

import java.util.Optional;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cafe.JWT.JwtFilter;
import com.cafe.constants.CafeConstants;
import com.cafe.dao.BillDao;
import com.cafe.model.Bill;
import com.cafe.utils.CafeUtils;
import com.google.gson.JsonObject;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BillServiceImple implements BillService {

	@Autowired
	JwtFilter jwtFilter;

	@Autowired(required = true)
	BillDao billDao;

	@Override
	public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
		log.info("Bill Service Impl {}", requestMap);
		log.info("Inside generateReport");
		try {
			String fileName = null;
			if (validateRequestMap(requestMap)) {
				if (requestMap.containsKey("isGenerate") && !(Boolean) requestMap.get("isGenerate")) {
					fileName = (String) requestMap.get("uuid");
				} else {
					fileName = CafeUtils.getUUID();
					requestMap.put("uuid", fileName);
					insertBill(requestMap);
				}

				String data = "Name: " + requestMap.get("name") + "\n" + "Contact Number: "
						+ requestMap.get("contactNumber") + "\n" + "Email: " + requestMap.get("email") + "\n"
						+ "Payment Method: " + requestMap.get("paymentMethod");
				Document document = new Document();
				PdfWriter.getInstance(document,
						new FileOutputStream(CafeConstants.STORE_LOCATION + "\\" + fileName + ".pdf"));

				document.open();
				setRectangaleInPdf(document);

				Paragraph chunk = new Paragraph("Cafe Management System", getFont("Header"));
				chunk.setAlignment(Element.ALIGN_CENTER);
				document.add(chunk);

				Paragraph paragraph = new Paragraph(data + "\n \n", getFont("Data"));
				document.add(paragraph);

				PdfPTable table = new PdfPTable(5);
				table.setWidthPercentage(100);
				addTableHeader(table);

				JSONArray jsonArray = CafeUtils.getJsonArrayFromString((String) requestMap.get("productDetails"));
				System.out.println("jsonArray : " + jsonArray);
				System.out.println("jsonArray Length : " + jsonArray.length());
				for (int i = 0; i < jsonArray.length(); i++) {
//					 problem
//					log.info(" " + jsonArray.getJSONObject(i));
//					System.out.println(i);
					JSONObject obj = jsonArray.getJSONObject(i);
//					log.info( ""+obj);
//					log.info(" "+obj.get("name"));
					Map<String, Object> map = new HashMap<>();
					map.put("name", obj.get("name"));
					map.put("price", obj.get("price"));
					map.put("total", obj.get("total"));
					map.put("quantity", obj.get("quantity"));
					map.put("category", obj.get("category"));

					addRows(table, map);
				}

				document.add(table);

				Paragraph footer = new Paragraph("Total: " + requestMap.get("totalAmount") + "\n"
						+ "Thank you for visiting. Please visit again!!", getFont("Data"));
				document.add(footer);
				document.close();
				return new ResponseEntity<>("{\"uuid\":\"" + fileName + "\"}", HttpStatus.OK);

			}
			return CafeUtils.getResponseEntity("Required data not found", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private Font getFont(String type) {
		log.info("inside getFont");
		switch (type) {
		case "Header":
			Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 18, BaseColor.BLACK);
			headerFont.setStyle(Font.BOLD);
			return headerFont;

		case "Data":
			Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, BaseColor.BLACK);
			dataFont.setStyle(Font.BOLD);
			return dataFont;

		default:
			return new Font();
		}
	}

	private void addRows(PdfPTable table, Map<String, Object> data) {
		log.info("inside addRows");
//		System.out.println("Name " + data.get("name"));
		table.addCell((String) data.get("name"));
		table.addCell((String) data.get("category"));
		table.addCell((String) data.get("quantity"));
		table.addCell(Integer.toString((Integer) data.get("price")));
		table.addCell(Integer.toString((Integer) data.get("total")));

	}

	private void addTableHeader(PdfPTable table) {
		log.info("inside addTableHeader");
		Stream.of("Name", "Category", "Quantity", "Price", "Sub Total").forEach(columnTitle -> {
			PdfPCell header = new PdfPCell();
			header.setBorderColor(BaseColor.LIGHT_GRAY);
			header.setBorderWidth(2);
			header.setPhrase(new Phrase(columnTitle));
			header.setBackgroundColor(BaseColor.YELLOW);
			header.setHorizontalAlignment(Element.ALIGN_CENTER);
			header.setVerticalAlignment(Element.ALIGN_CENTER);
			table.addCell(header);
		});

	}

	private void setRectangaleInPdf(Document document) throws DocumentException {
		log.info("inside setRectangleInPdf");
		com.itextpdf.text.Rectangle rect = new com.itextpdf.text.Rectangle(577, 825, 18, 5);
		rect.enableBorderSide(1);
		rect.enableBorderSide(2);
		rect.enableBorderSide(4);
		rect.enableBorderSide(8);
		rect.setBorderColor(BaseColor.BLACK);
		rect.setBorderWidth(1);
		document.add(rect);

	}

	private void insertBill(Map<String, Object> requestMap) {
		try {
			Bill bill = new Bill();
			bill.setUuid((String) requestMap.get("uuid"));
			bill.setName((String) requestMap.get("name"));
			bill.setEmail((String) requestMap.get("email"));
			bill.setContactNumber((String) requestMap.get("contactNumber"));
			bill.setPaymentMethod((String) requestMap.get("paymentMethod"));
			bill.setTotal(Integer.parseInt((String) requestMap.get("totalAmount")));
			System.out.println("Bill Service : " + (String) requestMap.get("productDetails"));
			bill.setProductDetails((String) requestMap.get("productDetails"));
			bill.setCreatedBy(jwtFilter.getCurrentUser());
			bill.setDate(new Date());
			billDao.save(bill);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private boolean validateRequestMap(Map<String, Object> requestMap) {
		return requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
				&& requestMap.containsKey("email") && requestMap.containsKey("paymentMethod")
				&& requestMap.containsKey("productDetails") && requestMap.containsKey("totalAmount");
	}

	@Override
	public ResponseEntity<List<Bill>> getBills() {
		List<Bill> list = new ArrayList<>();
		if (jwtFilter.isAdmin()) {
			list = billDao.getAllBills();
		} else {
			list = billDao.getBillByUserName(jwtFilter.getCurrentUser());
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
		log.info("inside getpdf:requestMap {}", requestMap);
		try {
			byte[] byteArray = new byte[0];
			if (!requestMap.containsKey("uuid") && validateRequestMap(requestMap)) {
				return new ResponseEntity<>(byteArray, HttpStatus.BAD_REQUEST);
			}
			String filepath = CafeConstants.STORE_LOCATION + "\\" + (String) requestMap.get("uuid") + ".pdf";

			if (CafeUtils.isFileExist(filepath)) {
				byteArray = getByteArray(filepath);
				return new ResponseEntity<>(byteArray, HttpStatus.OK);

			} else {
				requestMap.put(filepath, false);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private byte[] getByteArray(String filepath) throws Exception {
		File initialFile = new File(filepath);
		FileInputStream targetStream = new FileInputStream(initialFile);
		byte[] byteArray = IOUtils.toByteArray(targetStream);
		targetStream.close();
		return byteArray;
	}

	@Override
	public ResponseEntity<String> deleteBill(Integer id) {
		try {
			Optional optional = billDao.findById(id);
			if (!optional.isEmpty()) {
				billDao.deleteById(id);
				return CafeUtils.getResponseEntity("bill deleted successfully", HttpStatus.OK);
			}
			return CafeUtils.getResponseEntity("bill does not exist", HttpStatus.OK);
		} catch (Exception e) {

		}
		return null;
	}

}
