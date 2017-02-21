package edjab.com.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface UserProfileInfo {

	@RequestMapping(value="/AttendedByUser", method=RequestMethod.POST)	
	public void attendedByUser(@RequestParam("attendedby") String attendedby,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/LikedByUser", method=RequestMethod.POST)	
	public void likedByUser(@RequestParam("likedby") String likedby,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/FollowedByUser", method=RequestMethod.POST)	
	public void followedByUser(@RequestParam("followedby") String followedby,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/ReviewedByUser", method=RequestMethod.POST)	
	public void reviewedByUser(@RequestParam("reviewedby") String reviewedby,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
