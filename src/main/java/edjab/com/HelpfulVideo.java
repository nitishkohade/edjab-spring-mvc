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
public class HelpfulVideo {

	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private CreateClient client;
	
	
	
	@RequestMapping(value="/createHelpfulVideo", method = RequestMethod.POST)
	public void createHelpfulVideo_POST(@RequestParam("videoid") String videoid, @RequestParam("videourl") String videourl,
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
				
				webResource = client.getClient().resource(serviceurl.getUrl()+"/usertovideoservice/create/?userid="+userid+"&videoid="+videoid+"&videourl="+videourl);

				
			 	execute = webResource
			 			.header("Authorization", key.getKey())
			 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").post(ClientResponse.class);
				
			 	result = execute.getEntity(String.class).toLowerCase();
			 	
			 	if(result.equals("true")){
			 		response.getWriter().print("200");
			 	}
			 	else if(result.equals("false")){
			 		response.getWriter().print("400");
			 	}
			 	
				
				}
			} 
			catch (Exception e) {
					response.getWriter().print("500");
			}
		finally{
			webResource = null;
			execute = null;
			result = null;
		}
						
			 
		
		
		
		
	}
	
}
