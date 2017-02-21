package edjab.com;

import java.io.IOException;
import java.net.UnknownHostException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.edjab.model.UserProfile;
import com.edjab.model.UserValidator;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;
import emailusingdependentprotocol.SendValidateActivation;

@Controller
public class ActivateUser {

	//private static Client client = Client.create();	
	
	@Autowired
	private CreateClient client;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private ServiceURL serviceurl;
	
		
	
	@RequestMapping(value = "/activateUser", method = RequestMethod.POST)
	public void activateUser_POST(HttpServletRequest request, HttpServletResponse response,
			 @RequestBody UserProfile user) throws IOException{
		
		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String token = null;
		
		String host = request.getRequestURL().toString().split("/")[2];
		 
				
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		try {
		validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/createregistrationtoken/?userId="+user.getUserId());
		validateExecute = validateWebResource
				.header("Authorization", key.getKey())
				.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
		
		//Token generated from this webservice
		token = validateExecute.getEntity(String.class);
		    		   	
		//Email to be sent to this email id
		
			SendValidateActivation.send((String)user.getUserId(), token, host, request.getScheme());
			
			response.getWriter().print("200");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			response.getWriter().print("500");
		}
		finally{
			validateWebResource = null;			
			validateExecute = null;			
			token = null;
			host = null;
		}
		
		
		
	}
	
	
	
	
	@RequestMapping(value="/ActivationValidated", method=RequestMethod.GET)
	public ModelAndView activationValidated_GET(HttpServletResponse response, HttpServletRequest request
			, @RequestParam("userId") String userId, @RequestParam("token") String token ) throws UnknownHostException{
		
		
		  String userEmailId = (String)request.getSession().getAttribute("user_emailId");
		    ModelAndView modelAndView;
		    
		    String host = request.getRequestURL().toString().split("/")[2];
		    
		    
		    if(userEmailId!=null){
		    	modelAndView  = new ModelAndView("redirect:"+request.getScheme()+"://"+host);
				
		    	response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
				response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
				response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
				response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
				
		    }	
		    else{
		    	
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
				
		
		modelAndView = new ModelAndView("/mainpages/activationvalidated");
		modelAndView.addObject("token", token);
		modelAndView.addObject("emailId", userId);
		    }
		return modelAndView;
	}
		
	
	@RequestMapping(value="/ActivationValidated", method=RequestMethod.POST)
	public void activationValidated_POST(@RequestBody UserValidator userValidator, HttpServletResponse response) throws IOException{
		

		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String result = "false";
		
		try{						
						
			String input = "{\"userId\":"+"\""+userValidator.getUserId()+"\""+",\"registrationToken\":"+"\""+userValidator.getRegistrationToken()+"\""+"}";
	    	 
			validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/validate/");

			validateExecute = validateWebResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);
		 		 	
 		 	result = validateExecute.getEntity(String.class).toLowerCase().toString();
 		 	
 		 	if(result.equals("true")){
 		 		response.getWriter().print("200");
 		 	}
 		 	else if(result.equals("false")){
 		 		response.getWriter().print("400");
 		 	}
 		 		
			
		}
		catch(Exception e){
			
		 	response.getWriter().print("500");	
		}
		finally{
			validateWebResource = null;			
			validateExecute = null;			
			result = null;
		}
		
	}
	
	
}
