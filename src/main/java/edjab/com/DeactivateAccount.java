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

import com.edjab.model.ConfirmPassword;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;

@Controller
public class DeactivateAccount {

	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private CreateClient client;
	
	
	
	@RequestMapping(value="/deactivateAccount", method=RequestMethod.POST)
	public void deactivateAccount_Post(HttpServletResponse response, HttpServletRequest request, @RequestBody ConfirmPassword password) throws IOException{
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		WebResource webResource = null;
		ClientResponse execute = null;
		String result = null;
		
		
		try {
			
			HttpSession session = request.getSession();
						
			//String input = "{\"emailId\":"+"\""+session.getAttribute("user_emailId")+"\""+",\"currentPassword\":"+"\""+updatePassword.getCurrentPassword()+"\""+",\"updatedPasswords\":"+"\""+updatePassword.getUpdatedPassword()+"}";
	   	 
						
			 webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/isvaliduser/?userId="+session.getAttribute("user_emailId")+"&password="+password.getConfirmDeactivatePassword());

			//WebResource webResource1 = client.resource("http://localhost:8081/EdjabWebService/userprofileservice/updatePassword/?emailId="+session.getAttribute("user_emailId")+"&currentPassword="+updatePassword.getCurrentPassword()+"&updatedPassword="+updatePassword.getUpdatedPassword());

			
		 	execute = webResource
		 			.header("Authorization", key.getKey())
		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").get(ClientResponse.class);
			
		 	result = execute.getEntity(String.class).toLowerCase();
		 	
		 	if(result.equals("true")){
		 		
				String input = "{\"userId\":\""+session.getAttribute("user_emailId")+"\"}";
			   	 
		 		
		 		  webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/deactivate/");

				 execute = webResource
						 .header("Authorization", key.getKey())
						 .header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);
					
		 		/*String r = execute.getEntity(String.class);*/
		 		
		 		session.removeAttribute("user_emailId");
				session.invalidate();
	 		
		 		response.getWriter().print("200");
		 	}
		 	else if(result.equals("false")){
		 		response.getWriter().print("400");
		 	}
		 			 	
			
		 	
			} catch (Exception e) {
				response.getWriter().print("500");
			}finally{
				webResource = null;			
				execute = null;			
				result = null;
			}
			
		
		
	}
	
}
