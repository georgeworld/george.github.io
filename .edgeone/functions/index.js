
      let global = globalThis;

      class MessageChannel {
        constructor() {
          this.port1 = new MessagePort();
          this.port2 = new MessagePort();
        }
      }
      class MessagePort {
        constructor() {
          this.onmessage = null;
        }
        postMessage(data) {
          if (this.onmessage) {
            setTimeout(() => this.onmessage({ data }), 0);
          }
        }
      }
      global.MessageChannel = MessageChannel;

      let routeParams = {};
      let pagesFunctionResponse = null;
      async function handleRequest(context){
        const request = context.request;
        const urlInfo = new URL(request.url);

        if (urlInfo.pathname !== '/' && urlInfo.pathname.endsWith('/')) {
          urlInfo.pathname = urlInfo.pathname.slice(0, -1);
        }

        let matchedFunc = false;
        
          if('/helloworld' === urlInfo.pathname) {
            matchedFunc = true;
              (() => {
  // functions/helloworld/index.js
  var json = JSON.stringify({
    "code": 0,
    "message": "Hello World"
  });
  function onRequest(context) {
    return new Response(json, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "x-edgefunctions-test": "Welcome to use Pages Functions."
      }
    });
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        
          if('/kvdb' === urlInfo.pathname) {
            matchedFunc = true;
              (() => {
  // functions/kvdb/index.js
  async function onRequest({ request, params, env }) {
    const visitCount = await gblog.get("visitCount");
    let visitCountInt = Number(visitCount);
    visitCountInt += 1;
    await gblog.put("visitCount", visitCountInt.toString());
    const res = JSON.stringify({
      visitCount: visitCountInt
    });
    return new Response(res, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        

        const params = {};
        if (routeParams.id) {
          const value = urlInfo.pathname.replace(routeParams.left, '');
          const splitedValue = value.split('/');
          if (splitedValue.length === 1) {
            params[routeParams.id] = splitedValue[0];
          } else {
            params[routeParams.id] = splitedValue;
          }
        }
        if(!matchedFunc){
          pagesFunctionResponse = function() {
            return new Response(null, {
              status: 404,
              headers: {
                "content-type": "text/html; charset=UTF-8",
                "x-edgefunctions-test": "Welcome to use Pages Functions.",
              },
            });
          }
        }
        return pagesFunctionResponse({request, params, env: {} });
      }addEventListener('fetch',event=>{return event.respondWith(handleRequest({request:event.request,params: {}, env: {} }))});