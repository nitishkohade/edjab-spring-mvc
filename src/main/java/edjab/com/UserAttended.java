package edjab.com;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;

@Controller
public class UserAttended {
	
	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey k;
	
	@Autowired
	private CreateClient client;

	@RequestMapping(value="/removeAttendService", method=RequestMethod.GET)
	public String getAttendedByUser_Get(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		String host = request.getRequestURL().toString().split("/")[2];
		
		return "redirect:"+request.getScheme()+"://"+host;

	}
	
	@RequestMapping(value="/removeAttendService", method=RequestMethod.POST)
	public void getAttendedByUser_POST(@RequestParam("key") String key, 
			HttpServletResponse response, HttpServletRequest request) throws IOException{
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		 WebResource webResource = null;
		 ClientResponse execute = null;
		String result = null;
		 
		 
		try {
			
			HttpSession session = request.getSession();
			
			String userid = (String)session.getAttribute("user_emailId");
			
			if(userid==null){
				response.getWriter().print("408");
			}
			else {
						
			 webResource = client.getClient().resource(serviceurl.getUrl()+"/attendservice/delete/?attendedby="+userid+"&attendedTo="+key);

			
		 	execute = webResource
		 			.header("Authorization", k.getKey())
		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").delete(ClientResponse.class);
			
		 	result = execute.getEntity(String.class).toLowerCase();
		 	
		 	if(result.equals("true")){
		 		response.getWriter().print("200");
		 	}
		 	else if(result.equals("false")){
		 		response.getWriter().print("400");
		 	}
		 			 	
			}
		 	
			} catch (Exception e) {
				response.getWriter().print("500");
			}
		finally{
			webResource = null;
			execute = null;
			result = null;
		}
	}
	
	
}
