package edjab.com.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface CategoryAutocomplete {

	@RequestMapping(value="/CategoryAutocomplete", method=RequestMethod.POST)	
	public void getCategoryAutocomplete(@RequestParam("location") String location, HttpServletRequest request, 
						HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/SchoolPerCategoryId", method=RequestMethod.POST)	
	public void getSchoolPerCategoryId(@RequestParam("location") String location, HttpServletRequest request, 
						HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/SchoolPerCategoryIdAndLocation", method=RequestMethod.POST)	
	public void getSchoolPerCategoryIdAndLocation(@RequestParam("category") String category, @RequestParam("location") String location, 
						HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
