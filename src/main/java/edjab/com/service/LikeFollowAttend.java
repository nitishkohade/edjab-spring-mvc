package edjab.com.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public interface LikeFollowAttend {

	@RequestMapping(value="/DefaultUserToAttend", method=RequestMethod.POST)	
	public void defaultUserToAttend(@RequestParam("attendedby") String attendedby, @RequestParam("attendedTo") String attendedTo,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/DefaultUserToLike", method=RequestMethod.POST)	
	public void defaultUserToLike(@RequestParam("likedby") String likedby, @RequestParam("likedTo") String likedTo,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
	@RequestMapping(value="/DefaultUserToFollow", method=RequestMethod.POST)	
	public void defaultUserToFollow(@RequestParam("followedby") String followedby, @RequestParam("followedTo") String followedTo,
			HttpServletRequest request, HttpServletResponse response) throws IOException;
	
}
