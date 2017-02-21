package edjab.com.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface FrontListMapView {

	@RequestMapping(value="/GetTopRatedSchools", method=RequestMethod.POST)	
	public void getTopRatedSchools(HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/GetSchoolPerCategory", method=RequestMethod.POST)	
	public void getSchoolPerCategory(@RequestParam("category") String category, HttpServletRequest request, 
						HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/GetSchoolPerCategoryAndLocation", method=RequestMethod.POST)	
	public void getSchoolPerCategoryAndLocation(@RequestParam("category") String category, @RequestParam("location") String location, 
						HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	
}
