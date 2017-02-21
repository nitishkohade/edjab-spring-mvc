package edjab.com.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface HeaderAutocomplete {
	
	//@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
	@RequestMapping(value="/TechnicalAutocomplete", method=RequestMethod.GET)
	public void getHeaderAutocomplete(@RequestParam("typedthings") String typedthings, HttpServletRequest request, HttpServletResponse response) throws IOException;
		
	
}
