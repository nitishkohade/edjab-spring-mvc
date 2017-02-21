package edjab.com;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.edjab.model.EditableUserProfile;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;

@Controller
public class EditUserInfo {

	@Autowired
	private CreateClient client;
	
	@Autowired
	private AuthKey key;
	
	//private Client client = Client.create();
	
	@Autowired
	private ServiceURL serviceurl;
	

	
	@RequestMapping(value = "/editUserInfo", method = RequestMethod.POST)
	public void editUserInfo_Post(HttpServletRequest request, HttpServletResponse response,
			@RequestBody EditableUserProfile editableUserProfile) throws IOException {
		
		String userId = (String)request.getSession().getAttribute("user_emailId");
		
		String isFacebookUser = (String)request.getSession().getAttribute("isFacebookUser");
		
		String firstName=editableUserProfile.getFirstName();
		firstName = firstName==null ||firstName.equals("")?" " : firstName;
		
		String middleName=editableUserProfile.getMiddleName();
		middleName =middleName==null ||middleName.equals("")?" " : middleName;
		
		String lastName=editableUserProfile.getLastName();
		lastName =lastName==null|| lastName.equals("")?" " : lastName;
		
		String gender=editableUserProfile.getGender();
		gender = gender==null ||gender.equals("")?" " : gender;
		
		String street=editableUserProfile.getStreet();
		street = street==null||street.equals("")?" " : street;
		
		String city=editableUserProfile.getCity();
		city = city==null||city.equals("")?" " : city;
		
		String indianState=editableUserProfile.getIndianState();
		indianState = indianState==null||indianState.equals("")?" " : indianState;
		
		String country=editableUserProfile.getCountry();
		country = country==null||country.equals("")?" " : country;
		
		String zip=editableUserProfile.getZip();
		zip = zip==null||zip.equals("")?" " : zip;
		
		String contactNumber=editableUserProfile.getContactNumber();
		contactNumber = contactNumber==null||contactNumber.equals("")?" " : contactNumber;
		
		String emailId=editableUserProfile.getEmailId();
		emailId = emailId==null||emailId.equals("")?" " : emailId;
		/*
		PhoneNumber phone = null;
		
		String area=null, exch=null, ext=null;
		
		if(!contactNumber.equals("")&&contactNumber!=null){
			area = contactNumber.substring(0, 3);
			exch = contactNumber.substring(2, 5);
			ext = contactNumber.substring(4, 8);
			
			phone = new PhoneNumber(area, exch, ext);
			editableUserProfile.setContactNumber(phone);
		}
		*/
		
		
		//editableUserProfile.setContactNumber(phone);
		
		String dateOfBirth=editableUserProfile.getDateOfBirth();
		dateOfBirth = dateOfBirth==null||dateOfBirth.equals("")?" " : dateOfBirth;
		
		/*DateOfBirth dob = null;
		Integer day=0, month=0, year=0;
		
		if(!dateOfBirth.equals("")&&dateOfBirth!=null){
			String[] dateArray = dateOfBirth.split("-");
			
			day = Integer.parseInt(dateArray[0]);
			month = Integer.parseInt(dateArray[1]);
			year = Integer.parseInt(dateArray[2]);
			
			dob = new DateOfBirth(day, month, year);
		}*/
			
		
		WebResource webResource = null; 
		ClientResponse execute = null;
		String result = null;
		
		try{
			
		/*	Gson gson = new Gson();
			
			String input = gson.toJson(editableUserProfile);*/
			
			String input = null;
			
					if(isFacebookUser.equals("true")){
						input = "{\"userId\":"+"\""+userId+"\""+
								",\"firstName\":"+"\""+firstName+"\""+
								",\"middleName\":"+"\""+middleName+"\""+
								",\"lastName\":"+"\""+lastName+"\""+
								",\"city\":"+"\""+city+"\""+
								",\"street\":"+"\""+street+"\""+
								",\"gender\":"+"\""+gender.toUpperCase()+"\""+
								",\"indianState\":"+"\""+indianState+"\""+
								",\"country\":"+"\""+country+"\""+
								",\"zip\":"+"\""+zip+"\""+
								",\"contactNumber\":"+"\""+contactNumber+"\""+
								",\"dateOfBirth\":"+"\""+dateOfBirth+"\""+
								",\"emailId\":\""+emailId+"\"}";
					}
					else if(!isFacebookUser.equals("true")){
						input = "{\"userId\":"+"\""+userId+"\""+
								",\"firstName\":"+"\""+firstName+"\""+
								",\"middleName\":"+"\""+middleName+"\""+
								",\"lastName\":"+"\""+lastName+"\""+
								",\"city\":"+"\""+city+"\""+
								",\"street\":"+"\""+street+"\""+
								",\"gender\":"+"\""+gender.toUpperCase()+"\""+
								",\"indianState\":"+"\""+indianState+"\""+
								",\"country\":"+"\""+country+"\""+
								",\"zip\":"+"\""+zip+"\""+
								",\"contactNumber\":"+"\""+contactNumber+"\""+
								",\"dateOfBirth\":"+"\""+dateOfBirth+"\""+
								",\"emailId\":\""+userId+"\"}";
					}
			 
						
					  	
	    		 
    		 	webResource = client.getClient().resource(serviceurl.getUrl()+"/userprofileservice/edit");

    		 	execute = webResource
    		 			.header("Authorization", key.getKey())
    		 			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").put(ClientResponse.class, input);
    		 	result = execute.getEntity(String.class);
    		 	//From nowhere onwards session info would also get change		    		   					
    			
    		 	if(result.equals("false")){
    		 		response.getWriter().print("400");
    		 	}
    		 	else if(result.equals("true")){
    		 		request.getSession().setAttribute("user_firstName", firstName);
        		 	request.getSession().setAttribute("user_middleName", middleName);
        		 	request.getSession().setAttribute("user_lastName", lastName);
        		 	request.getSession().setAttribute("user_gender", gender);
        		 	request.getSession().setAttribute("user_street", street);
        		 	request.getSession().setAttribute("user_city", city);
        		 	request.getSession().setAttribute("user_indianState", indianState);
        		 	request.getSession().setAttribute("user_country", country);
        		 	request.getSession().setAttribute("user_zip", zip);
        		 	request.getSession().setAttribute("user_contactNumber",contactNumber);
        		 	request.getSession().setAttribute("user_dateOfBirth", dateOfBirth);
        		 	if(isFacebookUser.equals("true")){
        		 	request.getSession().setAttribute("facebook_user_emailId", emailId);
        		 	}
        		 	
        					   					
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
	
		
	
	
}
