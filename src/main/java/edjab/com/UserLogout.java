package edjab.com;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserLogout {
	
	/*@RequestMapping(value = "/UserLogout", method = RequestMethod.GET)
	public String userLogout(HttpServletRequest request, HttpServletResponse response) {
					
		HttpSession session = request.getSession();
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
				
	    session.removeAttribute("isFacebookUser");	    
	    session.removeAttribute("facebook_user_emailId");
		session.removeAttribute("user_emailId");
		session.invalidate();
		
		return "redirect:"+request.getScheme()+"://"+host;

		
	}
	*/
	
	@RequestMapping(value = "/UserLogout", method = RequestMethod.GET)
	public void userLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
					
		HttpSession session = request.getSession();
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
				
	    session.removeAttribute("isFacebookUser");	    
	    session.removeAttribute("facebook_user_emailId");
		session.removeAttribute("user_emailId");
		session.invalidate();
		
		
		response.getWriter().print("200");

		
	}
	
}
