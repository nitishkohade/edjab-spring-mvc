package edjab.com;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.edjab.model.UserProfile;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.service.url.ServiceURL;
import emailusingdependentprotocol.SendValidateRegistration;

@Controller
public class LoginGoogleUser {

	
	@Autowired
	private ServiceURL serviceurl;
	
	@RequestMapping(value="/loginGoogleUser", method=RequestMethod.POST)
	public void loginGoogleUser(HttpServletRequest request, HttpServletResponse response, @RequestBody UserProfile user) throws IOException{
		
		try{
		Client client = Client.create();	
		WebResource webResource1 = client.resource(serviceurl.getUrl()+"/userprofileservice/?userId="+user.getEmailId()+"&password="+user.getPassword());

		ClientResponse execute1 = webResource1.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
		String result = execute1.getEntity(String.class).toString().toLowerCase();

    	

    	String input = "{\"userId\":"+"\""+user.getEmailId()+"\""+",\"password\":"+"\""+user.getPassword()+"\""+",\"registeredUser\":\"False\",\"facebookUser\":\"False\",\"googleUser\":\"True\"}";
    	 
    	if(result.equals("false")){
    		 
    		 WebResource webResource = client.resource("http://localhost:8081/EdjabWebService/userprofileservice/create/");

    		 	webResource.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").post(ClientResponse.class, input);
		
    		 	WebResource webResource2 = client.resource("http://localhost:8081/EdjabWebService/userprofileservice/createregistrationtoken/?userId="+user.getEmailId());
    		 	ClientResponse execute2 = webResource2.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
    			String token = execute2.getEntity(String.class);
    			String host = request.getRequestURL().toString().split("/")[2];		
    		   					
    			SendValidateRegistration.send((String)user.getEmailId(), token, host, request.getScheme());
    					   					
    			response.getWriter().print("200");
    	 	}
    	 else if(result.equals("true")){
    		 response.getWriter().print("400");
    	 }
		}
    	 catch(Exception e){
    		 response.getWriter().print("500");
    	 }
		
		
	}
	
	
}
