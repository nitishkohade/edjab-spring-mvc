package edjab.com;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class OperationsViaMail {

/*	
	@Autowired
	private CreateClient client;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private ServiceURL serviceurl;*/
	
	@RequestMapping(value = "/deactivateAccount", method=RequestMethod.GET)
	public String deactivateViaMail(HttpServletResponse response, HttpServletRequest request, 
			@RequestParam("emailId") String emailId){
		
		String host = request.getRequestURL().toString().split("/")[2];
		String userEmailId = (String)request.getSession().getAttribute("user_emailId");

		if(userEmailId==null){


			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "redirect:"+request.getScheme()+"://"+host+"/login";
		}	

		else{


			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "redirect:"+request.getScheme()+"://"+host+"/UserProfileInfo/#/setting";
		}
		
	}
	
	
	
	@RequestMapping(value = "/viewProfile", method=RequestMethod.GET)
	public String viewProfile(HttpServletResponse response, HttpServletRequest request, 
			@RequestParam("emailId") String emailId){
		
		String host = request.getRequestURL().toString().split("/")[2];
		String userEmailId = (String)request.getSession().getAttribute("user_emailId");

		if(userEmailId==null){


			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "redirect:"+request.getScheme()+"://"+host+"/login";
		}	

		else{


			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "redirect:"+request.getScheme()+"://"+host+"/UserProfileInfo/#/profile";
		}
		
	}
	
	
}
