package edjab.com.handler.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import edjab.com.handler.ErrorHandler;

@Component
public class ErrorHandlerImpl implements ErrorHandler{

	@Override	
	public String resourceHandlingError(HttpServletRequest request, HttpServletResponse response) {

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility
		
		String host = request.getRequestURL().toString().split("/")[2];
		
		return "redirect:"+request.getScheme()+"://"+host;
		
	}

}
