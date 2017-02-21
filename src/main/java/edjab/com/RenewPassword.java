package edjab.com;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.edjab.model.ChangePassword;
import com.edjab.model.UserProfile;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;
import emailusingdependentprotocol.PasswordValidated;
import emailusingdependentprotocol.SendTokenPassword;


@Controller
public class RenewPassword {

	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private CreateClient client;
	
	@RequestMapping(value = "/RenewPassword/GenerateToken", method=RequestMethod.GET)
	public String generateToken(HttpServletResponse response, HttpServletRequest request){


		String userEmailId = (String)request.getSession().getAttribute("user_emailId");
		String host = request.getRequestURL().toString().split("/")[2];

		if(userEmailId!=null){

			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "redirect:"+request.getScheme()+"://"+host;
		}	
		else{

			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return "included pages/common/forgotpassword/generatetoken";
		}
	}

	@RequestMapping(value = "/RenewPassword/GenerateToken", method=RequestMethod.POST)
	public void generateToken(HttpServletRequest request, HttpServletResponse response, @RequestBody UserProfile user) throws IOException{

		
		WebResource webResource = null;
		ClientResponse execute = null; 
		String result = null;
		String token = null;
		String host = request.getRequestURL().toString().split("/")[2];
		
		try{
			
			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/isvalid/?userId="+user.getUserId());

			execute = webResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
			result = execute.getEntity(String.class).toString().toLowerCase();


			if(result.equals("true")){

				String input = "{\"userId\":"+"\""+user.getUserId()+"\""+"}";

				webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/createpasswordresettoken/?userId="+user.getUserId());

				execute = webResource
						.header("Authorization", key.getKey())
						.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").put(ClientResponse.class, input);
				token = execute.getEntity(String.class);		

				SendTokenPassword.sendEmail((String)user.getUserId(), token, host, request.getScheme());    		

				//SendTokenPassword.sendEmail(emailId, token);
				response.getWriter().print("200");

			}
			else{
				response.getWriter().print("400");
			}

		}
		catch(Exception e){
			response.getWriter().print("500");
		}
		finally{
			webResource = null;
			execute = null;
			result = null;
			token = null;
			host = null;
		}
	}




	@RequestMapping(value="/RenewPassword/ResetPassword", method=RequestMethod.GET)
	public ModelAndView resetPassword(HttpServletResponse response, HttpServletRequest request, 
			@RequestParam("userId") String userId, @RequestParam("token") String token){



		String userEmailId = (String)request.getSession().getAttribute("user_emailId");
		ModelAndView modelAndView;
		String host = request.getRequestURL().toString().split("/")[2];

		if(userEmailId!=null){

			modelAndView = new ModelAndView("redirect:"+request.getScheme()+"://"+host);

			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			return modelAndView;
		}	

		else{


			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility



			modelAndView = new ModelAndView("included pages/common/forgotpassword/resetpassword");
			modelAndView.addObject("token", token);
			modelAndView.addObject("userId", userId);
			return modelAndView;
		}
	}


	@RequestMapping(value="/RenewPassword/ResetPassword", method=RequestMethod.POST)
	public void resetPassword(HttpServletResponse response, HttpServletRequest request ,@RequestBody ChangePassword changePassword) throws IOException{
		
		WebResource webResource = null;
		ClientResponse execute = null;
		String result = null;
		String host = request.getRequestURL().toString().split("/")[2];
		
		try{
			
			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/matchingpasswordresettoken/?userId="+changePassword.getUserId()+"&tokenid="+changePassword.getResetPasswordToken());

			execute = webResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);

			result = execute.getEntity(String.class).toLowerCase().toString();

			if(result.equals("true")){

				String input = "{\"userId\":"+"\""+changePassword.getUserId()+"\""+",\"resetPasswordToken\":"+"\""+changePassword.getResetPasswordToken()+"\""+",\"updatedPassword\":"+"\""+changePassword.getUpdatedPassword()+"\""+"}";

				webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/changepassword/");

				execute = webResource
						.header("Authorization", key.getKey())
						.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);

				PasswordValidated.sendPasswordValidatedMessage((String)changePassword.getUserId(), host,
						request.getScheme());

				response.getWriter().print("200");
			}
			else{
				response.getWriter().print("400");
			}
		}
		catch(Exception e){
			response.getWriter().print("500");
		}
		finally{
			webResource = null;
			execute = null;
			result = null;
			host = null;
		}

	}


}
