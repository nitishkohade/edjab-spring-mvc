package edjab.com;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserProfileData {

	
	
	
	
	
	@RequestMapping(value = "/UserProfileInfo/", method = RequestMethod.GET)
	public ModelAndView printWelcome(HttpServletResponse response, HttpServletRequest request) {

		
	    String userEmailId = (String)request.getSession().getAttribute("user_emailId");
	    ModelAndView modelAndView;
	    String host = request.getRequestURL().toString().split("/")[2];
	    
	    if(userEmailId==null){
	    	
	    	modelAndView  = new ModelAndView("redirect:"+request.getScheme()+"://"+host);		
	    	
	    }	
	    else{
	    	
	    	
	    	
	    	modelAndView  = new ModelAndView("mainpages/user_data");
	    	
	    }
				
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		
		return modelAndView;

	}
	
	
	
	
	@RequestMapping(value = "/UserProfileInfo", method = RequestMethod.GET)
	public String printWelcome1(HttpServletResponse response, HttpServletRequest request) {

		String userEmailId = (String)request.getSession().getAttribute("user_emailId");
		String host = request.getRequestURL().toString().split("/")[2];
	    if(userEmailId==null){
	    	
	    	response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
			
	    	
	    	return "redirect:"+request.getScheme()+"://"+host;		
	    	
	    }	
		
		
		
		
	return "redirect:"+request.getScheme()+"://"+host+"/UserProfileInfo/";

	}

	
	
}
