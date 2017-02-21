package edjab.com.handler.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import edjab.com.handler.GlobalExceptionHandler;


//Please look for Exception implementation in spring.xml which is an alternative way...

@Component
public class GlobalExceptionHandlerImpl implements GlobalExceptionHandler{

	@Override
	public String handleGlobalException(HttpServletRequest request) {
		// TODO Auto-generated method stub
		String host = request.getRequestURL().toString().split("/")[2];
		return "redirect:"+request.getScheme()+"://"+host;
	}	
	
}
