package edjab.com.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface FacebookLogin {

	@RequestMapping(value="/FacebookLogin", method=RequestMethod.POST)	
	public void loginViaFacebook(@RequestParam("facebookId") String facebookId, @RequestParam("facebookName") String facebookName,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
