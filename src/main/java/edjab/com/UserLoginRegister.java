package edjab.com;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.edjab.model.UserProfile;
import com.edjab.model.UserValidator;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;
import emailusingdependentprotocol.SendValidateRegistration;

@Controller
public class UserLoginRegister {

	@Autowired
	private CreateClient client;

	@Autowired
	private AuthKey key;

	@Autowired
	private ServiceURL serviceurl;




	@RequestMapping(value = "/UserLogin", method = RequestMethod.POST)
	public void userLogin(final HttpServletRequest request, final HttpServletResponse response,  @RequestBody final UserProfile user) throws IOException {

		WebResource webResource = null;

		ClientResponse execute = null;

		String result = null;

		HttpSession session = request.getSession();

		try{

			response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
			response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
			response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
			response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

			
			boolean rememberme = user.isRememberme();
			
			String rememberCookie = null;
			
			if(rememberme==true){
				String authString = user.getUserId()+"|"+user.getPassword()+"|"+"edstalk";
		        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
		       
				rememberCookie = new String(authEncBytes);				
				
			}
			else if(rememberme==false){
				rememberCookie = " ";	
			}
			
			
			

			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/useridavailability/?userId="+user.getUserId());

			execute = 
					webResource
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
					.header("Authorization", key.getKey())
					.get(ClientResponse.class);

			result = execute.getEntity(String.class).toLowerCase();

			if(result.equals("false")){

				webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/isvaliduser/?userId="+user.getUserId()+"&password="+user.getPassword());

				execute = webResource.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
						.header("Authorization", key.getKey())
						.get(ClientResponse.class);

				result = execute.getEntity(String.class).toLowerCase().toString();

				if(result.equals("true")){

					webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/?userId="+user.getUserId());

					execute = webResource.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
							.header("Authorization", key.getKey())
							.get(ClientResponse.class);

					result = execute.getEntity(String.class);


					Gson gson = new GsonBuilder().create();
					JsonObject object = gson.fromJson(result, JsonObject.class).getAsJsonObject();

					if(object!=null){
						
						
						session.setAttribute("isFacebookUser", "false");

						String firstName = object.has("firstName") ? object.get("firstName").getAsString() : "";
						session.setAttribute("user_firstName", firstName.equals(" ")?"":firstName);

						String middleName = object.has("middleName") ? object.get("middleName").getAsString() : "";
						session.setAttribute("user_middleName", middleName.equals(" ")?"":middleName);

						String lastName = object.has("lastName") ? object.get("lastName").getAsString() : "";
						session.setAttribute("user_lastName", lastName.equals(" ")?"":lastName);

						String gender = object.has("gender") ? object.get("gender").getAsString() : ""; 	 	    
						session.setAttribute("user_gender", gender.equals(" ")?"":gender.toUpperCase());

						String street = object.has("street") ? object.get("street").getAsString() : "";
						session.setAttribute("user_street", street.equals(" ")?"":street);

						String city = object.has("city") ? object.get("city").getAsString() : "";
						session.setAttribute("user_city",  city.equals(" ")?"":city);

						String state = object.has("indianState") ? object.get("indianState").getAsString() : "";
						session.setAttribute("user_indianState", state.equals(" ")?"":state);

						String country = object.has("country") ? object.get("country").getAsString() : "";
						session.setAttribute("user_country", country.equals(" ")?"":country);

						String zip = object.has("zip") ? object.get("zip").getAsString() : "";
						session.setAttribute("user_zip", zip.equals(" ")?"":zip);

						String contactNumber = object.has("contactNumber") ? object.get("contactNumber").getAsString() : "";
						session.setAttribute("user_contactNumber", contactNumber.equals(" ")?"":contactNumber);

						String dateOfBirth = object.has("dateOfBirth") ? object.get("dateOfBirth").getAsString() : "";
						session.setAttribute("user_dateOfBirth", dateOfBirth.equals(" ")?"":dateOfBirth);

						String subscriptionFrequency = object.has("subscriptionFrequency") ? object.get("subscriptionFrequency").getAsString() : "";
						session.setAttribute("user_subscriptionFrequency", subscriptionFrequency.equals(" ")?"":subscriptionFrequency.toUpperCase());
					}

					//Putting user into session
					request.getSession().setAttribute("user_emailId", user.getUserId());

					response.getWriter().print("200"+"|"+rememberCookie);
				}
				else if(result.equals("false")){

					webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/isvalid/?userId="+user.getUserId());

					execute = webResource.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
							.header("Authorization", key.getKey())
							.get(ClientResponse.class);

					result = execute.getEntity(String.class).toLowerCase();

					if(result.equals("true")){
						response.getWriter().print("400"+"|"+" ");
					}
					else if(result.equals("false")){
						//Activate user
						session.setAttribute("user_id_request", user.getUserId());
						response.getWriter().print("408"+"|"+" ");

					}

				}
			}
			else if(result.equals("true")){
				response.getWriter().print("404"+"|"+" ");	
			}



		}
		catch(Exception e){
			response.getWriter().print("500"+"|"+" ");
		}
		finally{
			webResource = null;
			execute = null;
			result = null;
		}


	}



	@RequestMapping(value = "/renderActivationPage", method = RequestMethod.GET)
	public ModelAndView activateUser_POST(HttpServletResponse response, HttpServletRequest request) throws Exception {

		HttpSession httpSession = request.getSession();
		String userSession = null;
		String id = null;
		ModelAndView modelAndView = null;  
		String host = request.getRequestURL().toString().split("/")[2];

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

		userSession = (String)httpSession.getAttribute("user_emailId");

		if(userSession!=null){
			modelAndView = new ModelAndView("redirect:"+request.getScheme()+"://"+host);
		}
		else if(userSession==null){


			id = (String)httpSession.getAttribute("user_id_request");

			if(id!=null){
				modelAndView = new ModelAndView("/mainpages/activate_user");
				modelAndView.addObject("user_id_request", id);

				httpSession.removeAttribute("user_id_request");
				httpSession.invalidate();
			}
			else if(id==null){
				modelAndView = new ModelAndView("redirect:"+request.getScheme()+"://"+host);
			}
		}



		return modelAndView;
	}



	@RequestMapping(value="/RegistrationValidated", method=RequestMethod.GET)
	public ModelAndView registrationValidatedGET(HttpServletResponse response, HttpServletRequest request
			, @RequestParam("userId") String userId, @RequestParam("token") String token ){


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



			modelAndView = new ModelAndView("/mainpages/registrationvalidated");
			modelAndView.addObject("token", token);
			modelAndView.addObject("emailId", userId);
		}
		return modelAndView;
	}




	@RequestMapping(value="/RegistrationValidated", method=RequestMethod.POST)
	public void registrationValidated(@RequestBody UserValidator userValidator, HttpServletResponse response) throws IOException{


		WebResource webResource = null;

		ClientResponse execute = null;

		String result = "false";
		

		try{

			/*validateWebResource = client.resource("http://localhost:8081/EdjabWebService/userprofileservice/matchingregistrationtoken/?emailId="+userValidator.getUserId()+"&tokenid="+userValidator.getRegistrationToken());

		    validateExecute = validateWebResource.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);

		    result = validateExecute.getEntity(String.class).toLowerCase().toString();*/


			String input = "{\"userId\":"+"\""+userValidator.getUserId()+"\""+",\"registrationToken\":"+"\""+userValidator.getRegistrationToken()+"\""+"}";

			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/validate");

			execute = webResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);

			result = execute.getEntity(String.class).toLowerCase().toString();

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
			webResource = null;
			execute = null;
			result = null;
		}
	}





	@RequestMapping(value = "/UserRegister", method = RequestMethod.POST)
	public void userRegister(HttpServletRequest request, HttpServletResponse response,  @RequestBody UserProfile user) throws Exception {

		WebResource webResource = null;

		ClientResponse execute = null;

		String result = null;
		String host = request.getRequestURL().toString().split("/")[2];

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility


		try{

			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/useridavailability/?userId="+user.getUserId());

			execute = webResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);

			result = execute.getEntity(String.class).toLowerCase();

			if(result.equals("true")){


				String input = "{\"userId\":"+"\""+user.getUserId()+"\""+",\"password\":"+"\""+user.getPassword()+"\""+",\"registeredUser\":\"true\",\"facebookUser\":\"false\",\"googleUser\":\"false\"}";

				WebResource validateWebResource1 = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/create");

				ClientResponse validateExecute1 = validateWebResource1
						.header("Authorization", key.getKey())
						.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").post(ClientResponse.class, input);

				result = validateExecute1.getEntity(String.class);

				if(result.equals("true")){

					webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/createregistrationtoken/?userId="+user.getUserId());
					execute = webResource
							.header("Authorization", key.getKey())
							.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);

					//Token generated from this webservice
					String token = execute.getEntity(String.class);

					//Email to be sent to this email id
					SendValidateRegistration.send((String)user.getUserId(), token, host,
					 request.getScheme());

					response.getWriter().print("200");
				}
				else if(result.equals("false")){
					response.getWriter().print("500");
				}


			}
			else if(result.equals("false")){
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

