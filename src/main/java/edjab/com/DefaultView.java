package edjab.com;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DefaultView {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String printWelcome(HttpServletResponse response) {

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		
		return "mainpages/front";

	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage(HttpServletRequest request, HttpServletResponse response) {

				
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		String host = request.getRequestURL().toString().split("/")[2];
		
		HttpSession session = request.getSession();
		String user_emailId = (String)session.getAttribute("user_emailId");
		
		if(user_emailId==null){
			return "included pages/common/login_register/login";
		}
		else{
			return "redirect:"+request.getScheme()+"://"+host;
		}
		

	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String registerPage(HttpServletRequest request, HttpServletResponse response) {

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		String host = request.getRequestURL().toString().split("/")[2];
		
		HttpSession session = request.getSession();
		String user_emailId = (String)session.getAttribute("user_emailId");
		
		if(user_emailId==null){
			return "included pages/common/login_register/register";
		}
		else{
			return "redirect:"+request.getScheme()+"://"+host;
		}
		
		
		

	}
	
	
	/*@RequestMapping(value = "/**", method = RequestMethod.GET)
	public String error_Page(HttpServletRequest request, HttpServletResponse response) {

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
				
		return "redirect:"+request.getScheme()+"://"+host;
		

	}
	*/
	
	
}
