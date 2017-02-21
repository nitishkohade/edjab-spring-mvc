package edjab.com.authkey;

import org.apache.commons.codec.binary.Base64;

public class AuthKey {

	
	private String key;

	public AuthKey(String login, String password){
		
        String authString = login+":"+password;
        byte[] authEncBytes = Base64.encodeBase64(authString.getBytes());
       
		this.key = new String(authEncBytes);
	}
	
	public String getKey() {
		return "Basic "+key;
	}
	
		
}
