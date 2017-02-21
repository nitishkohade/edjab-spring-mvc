package edjab.com.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface UploadedImage {

	@RequestMapping(value="/GetUploadedImage", method=RequestMethod.POST)	
	public void getUploadedImage(@RequestParam("uploadedTo") String uploadedTo,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
