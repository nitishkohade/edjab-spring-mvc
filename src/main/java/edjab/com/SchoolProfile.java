package edjab.com;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.url.ServiceURL;

@Controller
public class SchoolProfile {

	//private static Client client = Client.create();	
	
	@Autowired
	private ServiceURL serviceurl;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private CreateClient client;
	
	@RequestMapping(value = "/SchoolName", method = RequestMethod.GET)
	public ModelAndView getSchoolProfile(@RequestParam("schoolId") String schoolId, HttpServletResponse response,
			 HttpServletRequest request) {
					
		/*response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		 */		
		
		ModelAndView mav = new ModelAndView("mainpages/iitaspirants");
		
		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String result = null;
		
		validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/schoolprofileservice/school?schoolId="+schoolId);
        
    	validateExecute = validateWebResource
    			.header("Authorization", key.getKey())
    			.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").get(ClientResponse.class);
	        
	    result = validateExecute.getEntity(String.class);
	    
		
	    Gson gson = new GsonBuilder().create();
	    JsonObject object = gson.fromJson(result, JsonObject.class).getAsJsonObject();
	    
	  
    	
	    if(object!=null){
	    	String instituteId = object.has("instituteId") ? object.get("instituteId").getAsString() : "";
	    	
	    	mav.addObject("instituteId", instituteId);
	    	
	    	String instituteName = object.has("instituteName") ? object.get("instituteName").getAsString() : "";
	    
	    	mav.addObject("instituteName", instituteName);
	    	
	    	String school_email = object.has("emailId") ? object.get("emailId").getAsString() : "";
	    	
	    	mav.addObject("school_email", school_email);
	    	
	    	String school_street = object.has("street") ? object.get("street").getAsString() : "";
	    	
	    	mav.addObject("school_street", school_street);
	    	
	    	String school_city = object.has("city") ? object.get("city").getAsString() : "";
	    	
	    	mav.addObject("school_city", school_city);
	    	
	    	String school_zip = object.has("zip") ? object.get("zip").getAsString() : "";
	    	
	    	mav.addObject("school_zip", school_zip);
	    	
	    	String mission = object.has("mission") ? object.get("mission").getAsString() : "";    	
	    	
	    	mav.addObject("mission", mission);
	    	
	    	String description = object.has("description") ? object.get("description").getAsString() : "";
	    	mav.addObject("description", description);
	    	
	    	
	    	
	    	String profileImageUrl = object.has("profileImageUrl") ? object.get("profileImageUrl").getAsString() : "";
	    	
	    	mav.addObject("profileImageUrl", profileImageUrl);
	    	
	    	String dateOfEstablishment = object.has("dateOfEstablishment") ? object.get("dateOfEstablishment").getAsString() : "";
	    	
	    	mav.addObject("dateOfEstablishment", dateOfEstablishment);
	    	
	    	//Object form of data
	    		    	
	    	String school_indianState = object.has("indianState") ? object.get("indianState").getAsString() : "";
	    	mav.addObject("school_indianState", school_indianState);
	    	
	    	String school_country = "India";
	    	mav.addObject("school_country", school_country);
	    	
	    	String school_contactNumber = object.has("contactNumber") ? object.get("contactNumber").getAsString() : "";
	    	mav.addObject("school_contactNumber", school_contactNumber);
	    	
	    	// likes, attendees, followers
	    	int attendees = object.has("attendees") ? object.get("attendees").getAsInt() : 0;
	    	mav.addObject("attendees", attendees);

	    	int likes = object.has("likes") ? object.get("likes").getAsInt() : 0;
	    	mav.addObject("likes", likes);
	    	
	    	int followers = object.has("followers") ? object.get("followers").getAsInt() : 0;
	    	mav.addObject("followers", followers);
	    	
	    	int reviews = object.has("reviews") ? object.get("reviews").getAsInt() : 0;
	    	mav.addObject("reviews", reviews);
	    	
	    	
	    	//lat and long
	    	double latitude = object.has("latitude") ? object.get("latitude").getAsDouble() : 0;
	    	mav.addObject("latitude", latitude);
	    	
	    	double longitude = object.has("longitude") ? object.get("longitude").getAsDouble() : 0;
	    	mav.addObject("longitude", longitude);
	    	
	    	//Ratings
	    	int oneStarRatings = object.has("oneStarRatings") ? object.get("oneStarRatings").getAsInt() : 0;
	    	
	    	//mav.addObject("oneStarRatings", oneStarRatings);
	    	
	    	int twoStarRatings = object.has("twoStarRatings") ? object.get("twoStarRatings").getAsInt() : 0;
	    	//mav.addObject("twoStarRatings", twoStarRatings);
	    	
	    	int threeStarRatings = object.has("threeStarRatings") ? object.get("threeStarRatings").getAsInt() : 0;
	    	//mav.addObject("threeStarRatings", threeStarRatings);
	    	
	    	int fourStarRatings = object.has("fourStarRatings") ? object.get("fourStarRatings").getAsInt() : 0;
	    	//mav.addObject("fourStarRatings", fourStarRatings);
	    	
	    	int fiveStarRatings = object.has("fiveStarRatings") ? object.get("fiveStarRatings").getAsInt() : 0;
	    	//mav.addObject("fiveStarRatings", fiveStarRatings);
	    	
	    	
	    	Double averageRating = object.has("averageRating") ? object.get("averageRating").getAsDouble() : 0;
	    	String averageRatingPrecision = String.format("%.1f", averageRating);
	    	mav.addObject("averageRating", averageRatingPrecision);
	    	
	    	double initialAverageRating = object.has("initialAverageRating") ? object.get("initialAverageRating").getAsDouble() : 0;
	    	String initialAverageRatingPrecision = String.format("%.1f", initialAverageRating);
	    	mav.addObject("initialAverageRating", initialAverageRatingPrecision);
	    	
	    	int totalUserRated = oneStarRatings+twoStarRatings+threeStarRatings+fourStarRatings+fiveStarRatings;
	    	long total5starRating = totalUserRated*5;
	    	
	    	double percent1Star = 0;
	    	double percent2Star = 0;
	    	double percent3Star = 0;
	    	double percent4Star = 0;
	    	double percent5Star = 0;
	    	
	    	if(total5starRating!=0){
	    		 percent1Star = (oneStarRatings*100)/total5starRating;
		    	 percent2Star = (twoStarRatings*200)/total5starRating;
		    	 percent3Star = (threeStarRatings*300)/total5starRating;
		    	 percent4Star = (fourStarRatings*400)/total5starRating;
		    	 percent5Star = (fiveStarRatings*500)/total5starRating;
	    	}
	    	
	    	
	    	mav.addObject("totalUserRated", totalUserRated);
	    	mav.addObject("percent1Star", percent1Star);
	    	mav.addObject("percent2Star", percent2Star);
	    	mav.addObject("percent3Star", percent3Star);
	    	mav.addObject("percent4Star", percent4Star);
	    	mav.addObject("percent5Star", percent5Star);
	    	
	    	
	    	//category
	    	JsonArray categories = object.has("categories") ? object.get("categories").getAsJsonArray() : null;
	    	List<String> categoriesList = new ArrayList<String>();
	    	if(categories!=null){
	    		for (JsonElement jsonElement : categories) {
	    			String cat = jsonElement.getAsString();
					
					categoriesList.add(cat);
				}
	    	}
	    	
	    	mav.addObject("categoriesList", categoriesList);
	    	//urls
	    	JsonArray urls = object.has("urls") ? object.get("urls").getAsJsonArray() : null;
	    	List<String> urlsList = new ArrayList<String>();
	    	if(urls != null){
	    		for (JsonElement jsonElement : urls) {
					String url = jsonElement.getAsString();
					
					urlsList.add(url);
				}
	    	}
	    	
	    	
	    	mav.addObject("urlsList", urlsList);
	    	
	    }
		
		return mav;		
	}
	
	
	
	@RequestMapping(value="/GetSchoolInJson", method=RequestMethod.GET)
	public void getSchoolInJson(@RequestParam("schoolId") String schoolId, HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		response.setHeader("Access-Control-Allow-Origin", "*");
	    response.setHeader("Access-Control-Allow-Methods", "GET");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
		
		
		WebResource validateWebResource = null;		
		ClientResponse validateExecute = null;		
		String result = null;		
		
				try{						
			validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/schoolprofileservice/school?schoolId="+schoolId);

			validateExecute = validateWebResource
					.header("Authorization", key.getKey())
					.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8").type("application/json").get(ClientResponse.class);
		 		 	
 		 	result = validateExecute.getEntity(String.class); 		 	 		 	
 		 	response.getWriter().print(result);
			}
			finally{
				validateWebResource = null;				
				validateExecute = null;				
				result = null;
			}
		
	}
	
}
