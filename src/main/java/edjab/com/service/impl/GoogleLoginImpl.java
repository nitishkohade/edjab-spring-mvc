package edjab.com.service.impl;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.GoogleLogin;
import edjab.com.service.url.ServiceURL;


@Component
public class GoogleLoginImpl implements GoogleLogin {

	@Autowired
	private CreateClient client;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private ServiceURL serviceurl;
	
	@Override
	public void loginViaGoogle(String googleId, String googleName, HttpServletRequest request,
			HttpServletResponse response) throws IOException {


		

		WebResource webResource = null;
		
		ClientResponse execute = null;
		
		String result = null;
		
		HttpSession session = request.getSession();
		
		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		
		try{
									
			webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/useridavailability/?userId="+googleId);
	        
			execute = webResource
		    		.header("Authorization", key.getKey())
		    		.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
		        
		    result = execute.getEntity(String.class).toLowerCase();
		    
		    if(result.equals("true")){
		    	
    		 
			String input = "{\"userId\":\""+googleId+"\",\"password\":\"googleuserpassedstalkorg\",\"registeredUser\":\"false\",\"facebookUser\":\"false\",\"googleUser\":\"true\"}";
    	    	    		 
    		webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/create");

    		execute = webResource
    				.header("Authorization", key.getKey())
    				.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").post(ClientResponse.class, input);
    		
    		result = execute.getEntity(String.class);
    		
    		if(result.equals("true")){
    			
    			getUserInfo(googleId, googleName, request, response, session);
    			
	    	
	    	response.getWriter().print("200");
    		}
    		else if(result.equals("false")){
    			response.getWriter().print("400");
			}
    		
    		
    	 	}
    	 else if(result.equals("false")){
    		 
    		 getUserInfo(googleId, googleName, request, response, session);
    		 
    		 response.getWriter().print("200");
    		
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
	
	
	public void getUserInfo(String googleId, String googleName, HttpServletRequest request,	HttpServletResponse response, 
			HttpSession session){
		
		WebResource webResource = null;
		
		ClientResponse execute = null;
		
		String result = null;
		
		webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/?userId="+googleId);
        
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
	session.setAttribute("user_emailId", googleId);
	}

}
