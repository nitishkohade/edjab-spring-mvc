package edjab.com.service.impl;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import edjab.com.authkey.AuthKey;
import edjab.com.client.CreateClient;
import edjab.com.service.FrontListMapView;
import edjab.com.service.url.ServiceURL;

@Component
public class FrontListMapViewImpl implements FrontListMapView{

	@Autowired
	private CreateClient client;
	
	@Autowired
	private AuthKey key;
	
	@Autowired
	private ServiceURL serviceurl;
	
	@Override
	public void getTopRatedSchools(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String result = null;
		
		try {												
			validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/schoolprofileservice/gettopratedschools");
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

	@Override
	public void getSchoolPerCategory(String category, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String result = null;
		
		try {												
			validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/schoolprofileservice/category/?categoryId="+category);
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

	@Override
	public void getSchoolPerCategoryAndLocation(String category, String location, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		WebResource validateWebResource = null;
		
		ClientResponse validateExecute = null;
		
		String result = null;
		
		try {												
			validateWebResource = client.getClient().resource(serviceurl.getUrl()+"/schoolprofileservice/categorylocationcomposite/?location="+location+"&category="+category);
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
