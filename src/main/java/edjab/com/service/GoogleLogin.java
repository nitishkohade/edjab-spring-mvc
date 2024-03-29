package edjab.com.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface GoogleLogin {

	@RequestMapping(value="/GoogleLogin", method=RequestMethod.POST)	
	public void loginViaGoogle(@RequestParam("googleId") String googleId, @RequestParam("googleName") String googleName,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
