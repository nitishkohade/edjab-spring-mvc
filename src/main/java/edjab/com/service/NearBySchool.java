package edjab.com.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface NearBySchool {

	/*@RequestMapping(value="/GetTopRatedSchools", method=RequestMethod.POST)	
	public void getTopRatedSchools(HttpServletRequest request, HttpServletResponse response) throws IOException;*/
	
	/*@RequestMapping(value="/GetSchoolPerCategory", method=RequestMethod.POST)	
	public void getSchoolPerCategory(@RequestParam("category") String category, HttpServletRequest request, 
						HttpServletResponse response) throws IOException;*/
	
	@RequestMapping(value="/GetTopRatedNearBySchool", method=RequestMethod.POST)	
	public void getTopRatedNearBySchool(@RequestParam("radius") String radius,  
			@RequestParam("userLatitude") String userLatitude, @RequestParam("userLongitude") String userLongitude, 
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/GetNearBySchoolPerCategory", method=RequestMethod.POST)	
	public void getNearBySchoolPerCategory(@RequestParam("radius") String radius,  
			@RequestParam("userLatitude") String userLatitude, @RequestParam("userLongitude") String userLongitude, 
			@RequestParam("category") String category,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
