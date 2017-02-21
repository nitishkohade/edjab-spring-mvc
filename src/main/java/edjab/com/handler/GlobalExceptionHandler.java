package edjab.com.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


//Please look for Exception implementation in spring.xml which is an alternative way...

@ControllerAdvice
public interface GlobalExceptionHandler {

	@ExceptionHandler(Throwable.class)
	public String handleGlobalException(HttpServletRequest request);
	
}
