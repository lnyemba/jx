/**
* (c) 2010 jxf - rpc module. 
*
* The idea of behind this module is fetching data via an RPC-like call:
*	. RESTful web services
*	. XML/SOAP (not yet implemented)
*	. Remote document (HTML; XML; JSON) 
*	. Local documents (HTML; XML; JSON)
* The module will return the data to a callback function should a parser be specified, the module will parse the data and return the parsed data to the callback function
* This allows the client code to minimize parsing should returned data be in a standard format.
* TODO:
*	Improve on how returned data is handled (if necessary).
*/
if(!jx){
  var jx = {}
}
/**
 * These are a few parsers that can come in handy:
 * urlparser:	This parser is intended to break down a url parameter string in key,value pairs
 */

function urlparser(url){
        if(url.toString().match(/\x3F/) != null){
            url = url.split('\x3F')[1]
            
        }
	var p = url.split('&') ;
	var r = {} ;
	r.meta = [] ;
	r.data = {} ;
	var entry;
	for(var i=0; i < p.length; i++){
		entry = p[i] ;
		key 	= (entry.match('(.*)=')  !=null)? entry.match('(.*)=')[1]:null ;
		value 	= (entry.match('=(.*)$') != null)? entry.match('=(.*)$')[1]:null
		if(key != null){
			key = key.replace('\x3F','')
			r.meta.push(key) ;
			r.data[key] = value  ;
		}
	}

	return r.data;
}

/**
* The following are corrections related to consistency in style & cohesion
*/
jx.ajax = {}
jx.ajax.get = {} ;
jx.ajax.debug = null;
jx.ajax.get.instance = function(){
    var factory = function(){
        this.obj = {}
        this.obj.headers = {}
        this.obj.async  = true;
        this.setHeader = function(key,value){
            if(key.constructor != String && value == null){
                this.obj.headers = key ;
            }else{
                this.obj.headers[key] = value;
            }
        }
        this.setData = function(data){
            this.obj.data = data;
        }
        this.setAsync = function(flag){
            this.obj.async = (flag == true) ;
        }
        this.send = function(url,callback,method){
            
            if(method == null){
                method = 'GET'
            }
            
            p = jx.ajax.debug != null;
            q = false;
            if(p){
                q = jx.ajax.debug[url] != null;
            }
            
            is_debuggable = p && q
            
            if(is_debuggable){
                x = {} ;
                x.responseText = jx.ajax.debug [url] ;                
                callback(x)
            }else{
                    var http =  new XMLHttpRequest()  ;
                    http.onreadystatechange = function(){
                        if(http.readyState == 4){
                            
                            callback(http)
                        }
                    }
                    //
                    // In order to insure backward compatibility
                    // Previous versions allowed the user to set the variable on the wrapper (poor design)
                    if(this.async != null){
                        this.setAsync(this.async) ;
                    }
                    http.open(method,url,this.obj.async) ;
                    for(key in this.obj.headers){
                        value = this.obj.headers[key] ;
                        
                        http.setRequestHeader(key,value)
                    }
                    
                    
                    http.send(this.obj.data)
            }
            
            
        }
	this.put = function(url,callback){
		this.send(url,callback,'PUT') ;
	}
	this.get = function(url,callback){
		this.send(url,callback,'GET') ;
	}
	this.post = function(url,callback){
		this.send(url,callback,'POST') ;
	}
    }//-- end of the factory method
    return new factory() ;
}

//
// backward compatibility
jx.ajax.getInstance = jx.ajax.get.instance ;
var HttpClient = jx.ajax.get ;
