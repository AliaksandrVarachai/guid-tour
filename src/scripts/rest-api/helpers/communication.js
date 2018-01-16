//http://ecsb00100b6f.epam.com/GuidedTourApiUnifyingAlex/
//http://ecsb00100c96.epam.com:8085/
const HOST = 'http://ecsb00100c96.epam.com:8085/';
const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

function fetchRequest(url, options){
  return fetch(url, options)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 204) {
        // TODO: process empty data
        console.warn('empty data received');
        return;
      }
      else {
        console.log("Status code: ", response.status);
      }
    })
    .catch(error => console.log("Error : ", error))
}

function get(api) {
  return fetchRequest(`${HOST}${api}`, {headers: HEADERS});
}

function post(api, data){
  const options = {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetchRequest(`${HOST}${api}`, options);
}

function put(api, data){
  const options = {
    headers: HEADERS,
    method: 'PUT',
    body: JSON.stringify(data)
  };
  return this.fetchRequest(`${HOST}${api}`, options);
}

function delete1(api) {
  return fetchRequest(`${this.host}${api}`, {method: 'DELETE'});
}

export default {
  get,
  post,
  put,
  'delete': delete1
}
