
  async function readRequestBody(request) {
	const { headers } = request;
	const contentType = headers.get('content-type') || '';
  
	if (contentType.includes('application/json')) {
	  return JSON.stringify(await request.json());
	} else if (contentType.includes('application/text')) {
	  return request.text();
	} else if (contentType.includes('text/html')) {
	  return request.text();
	} else {
	  return 'unspecified in header';
	}
  }
  

  async function handleRequest(request) {
	const reqBody = await readRequestBody(request);
	const retBody = `The request body sent in was ${reqBody}`;
	return new Response(retBody);
  }
  
  addEventListener('fetch', event => {
	const { request } = event;
	const { url } = request;
  
	if (request.method === 'POST') {
	  return event.respondWith(handleRequest(request));
	} else if (request.method === 'GET') {
	  return event.respondWith(new Response(`The request was a GET`));
	}
  });