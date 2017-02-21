package edjab.com.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public interface ErrorHandler {

	@RequestMapping(value="/ResourceErrorHandler", method=RequestMethod.GET)	
	public String resourceHandlingError(HttpServletRequest request, HttpServletResponse response);
	
}
