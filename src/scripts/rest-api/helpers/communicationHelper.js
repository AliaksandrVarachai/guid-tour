class CommunicationHelper{

	//http://ecsb00100b6f.epam.com/GuidedTourApiUnifyingAlex/
	//http://ecsb00100c96.epam.com:8085/
	constructor(host){
		this.host = host;
	}

	static get headers() {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}

	GET(api){
		var options = {
			headers: CommunicationHelper.headers
		};
		return this.fetchRequest(`${this.host}${api}`, options);
	}

	POST(api, data){
		var options = {
			headers: CommunicationHelper.headers,
			method: 'POST',
			body: JSON.stringify(data)
		};
		return this.fetchRequest(`${this.host}${api}`, options);
	}

	PUT(api, data){
		var options = {
			headers: CommunicationHelper.headers,
			method: 'PUT',
			body: JSON.stringify(data)
		};
		return this.fetchRequest(`${this.host}${api}`, options);
	}

	DELETE(api){
		var options = {
			method: 'DELETE'
		};
		return this.fetchRequest(`${this.host}${api}`, options);
	}

	fetchRequest(url, options){
		return fetch(url, options)
			.then(response => {
				if (response.status === 200) {
					return response.json();
				}
				else if (response.status === 204) {
					return;
				}
				else {
					console.log("Status code: ", response.status);
				}
				
			})
			.catch(error => console.log("Error : ", error))
	}
}
