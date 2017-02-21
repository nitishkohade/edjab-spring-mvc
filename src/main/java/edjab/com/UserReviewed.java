package edjab.com;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.edjab.model.Review;
import com.edjab.model.ReviewParameter;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;

@Controller
public class UserReviewed {
	
	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey k;
	
	@Autowired
	private CreateClient client;

		
	@RequestMapping(value="/removeReviewService", method=RequestMethod.POST)
	public void removeReview_POST(@RequestBody Review review, 
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
						
			String input = null;
			
			input = "{\"reviewedTo\":"+"\""+review.getReviewedTo()+"\""+
					",\"reviewedBy\":"+"\""+session.getAttribute("user_emailId")+"\"}";
						
			 webResource = client.getClient().resource(serviceurl.getUrl()+"/reviewservice/delete/");

			
		 	execute = webResource
		 			.header("Authorization", k.getKey())
		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").delete(ClientResponse.class, input);
			
		 	result = execute.getEntity(String.class).toLowerCase();
		 	
		 	if(result.equals("true")){
		 		response.getWriter().print("200");
		 	}
		 	else if(result.equals("false")){
		 		response.getWriter().print("400");
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
	

	
	@RequestMapping(value="/editReviewService", method=RequestMethod.POST)
	public void editReview_POST(@RequestBody ReviewParameter reviewParameter, 
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
						
			String input = null;
			
			input = "{\"reviewBody\":"+"\""+reviewParameter.getReviewBody()+"\""+
					",\"reviewedBy\":"+"\""+session.getAttribute("user_emailId")+"\""+
					",\"reviewedTo\":"+"\""+reviewParameter.getReviewedTo()+"\""+
					",\"ratedNumber\":"+"\""+reviewParameter.getRatedNumber()+"\"}";
						
			 webResource = client.getClient().resource(serviceurl.getUrl()+"/reviewservice/edit/");

			
		 	execute = webResource
		 			.header("Authorization", k.getKey())
		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);
			
		 	result = execute.getEntity(String.class).toLowerCase();
		 	
		 	if(result.equals("true")){
		 		response.getWriter().print("200");
		 	}
		 	else if(result.equals("false")){
		 		response.getWriter().print("400");
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
	
	

	
	@RequestMapping(value="/createReviewService", method=RequestMethod.POST)
	public void createReview_POST(@RequestBody ReviewParameter reviewParameter, 
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
				
			
						
			String input = null;
			
			input = "{\"reviewBody\":"+"\""+reviewParameter.getReviewBody()+"\""+
					",\"reviewedBy\":"+"\""+userid+"\""+
					",\"reviewedTo\":"+"\""+reviewParameter.getReviewedTo()+"\""+
					",\"ratedNumber\":"+"\""+reviewParameter.getRatedNumber()+"\"}";
						
			webResource = client.getClient().resource(serviceurl.getUrl()+"/reviewservice/create/");

			
		 	execute = webResource
		 			.header("Authorization", k.getKey())
		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").post(ClientResponse.class, input);
			
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
