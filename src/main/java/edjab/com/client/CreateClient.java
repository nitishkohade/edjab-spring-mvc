package edjab.com.client;

import com.sun.jersey.api.client.Client;

public class CreateClient {

	private Client client;
	
	public CreateClient(){
		
		client = Client.create();
		
	}
	
	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	
}
