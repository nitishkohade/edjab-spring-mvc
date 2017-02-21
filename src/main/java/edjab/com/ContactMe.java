package edjab.com;

import java.util.Hashtable;
import javax.mail.MessagingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ContactMe {


	@RequestMapping(value = "/ContactMe", method = RequestMethod.GET)
	public ModelAndView contactMe( HttpServletResponse response, HttpServletRequest request) {

		response.setHeader("Cache-Control","no-cache, must-revalidate"); //Forces caches to obtain a new copy of the page from the origin server
		response.setHeader("Cache-Control","no-store"); //Directs caches not to store the page under any circumstance
		response.setDateHeader("Expires", 0); //Causes the proxy cache to see the page as "stale"
		response.setHeader("Pragma","no-cache"); //HTTP 1.0 backward compatibility

		ModelAndView modelAndView = new ModelAndView("included pages/common/contactEdjab/contactEdjab");



		if((String)request.getSession().getAttribute("user_emailId") == null){
			modelAndView.addObject("no_e", "e");					
		}


		return modelAndView;

	}



	@RequestMapping(value = "/ContactMe", method = RequestMethod.POST)
	public void sendMessage(HttpServletResponse response, @RequestParam("userId") String emailId, @RequestParam("message") String text) throws Exception {


		String host = emailId.split("@")[1];

		Boolean result = true;


		try{




			Hashtable<String, String> env = new Hashtable<String, String>();
			env.put("java.naming.factory.initial",
					"com.sun.jndi.dns.DnsContextFactory");
			DirContext ictx = new InitialDirContext( env );
			Attributes attrs = ictx.getAttributes
					( host, new String[] { "MX" });
			Attribute attr = attrs.get( "MX" );
			if (( attr == null ) || ( attr.size() == 0 )) {
				attrs = ictx.getAttributes( host, new String[] { "A" });
				attr = attrs.get( "A" );
				if( attr == null )
				{
					result = false;
				}
			}



			if(result==true){
				emailusingdependentprotocol.ContactMe.contactMe(emailId, text);
				response.getWriter().print("200");
			}
			else if(result==false){
				response.getWriter().print("400");
			}




		} catch (MessagingException e) {
			response.getWriter().print("500");
		}







	}


}
