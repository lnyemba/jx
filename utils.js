/**
* Simple Javascript eXtension - 1.0
* (c) 2014 - 2015 Steve L. Nyemba, steve@the-phi.com
* License GPL version 3.0
* 
* Implementation of miscellaneous utilities commonly used, These functions are reusable and simple:
* jx.utils.vector				extracts a vector from an array of objects (or a matrix)
* jx.utils.keys					extract keys from an associative array
* jx.utils.unique				returns unique objects in an array, including array of objects (provided an key function)
*
* jx.utils.patterns:
* 		Implementation of design patterns defined by the GOF http://en.wikipedia.org/wiki/Software_design_pattern
* jx.utils.patterns.visitor		The visitor design pattern
* jx.utils.patterns.iterator	The iterator design pattern
* jx.utils.patterns.observer 	The observer design pattern
*/

if(!jx){
	var jx = {} ;
}

jx.utils={} ;

/**
* Extract an array from an array of associative arrays (map), 
* This function can also perform a sort of join provided a set of keys (good for building a matrix)
* @param key	key or column of the associative array
* @param array	an array or associative arrays i.e [{}]
*/
jx.utils.vector=function(key,rec){
	var vector = [] ;
	var value;
	for(var i=0; i < rec.length; i++){
//		value = rec[i][key] ;	
//                if(key.constructor == String){
//                    vector.push( value ) ;
//                }else
                if(key.constructor == Array){
                    value = []
                    for(ii in key){
                        value.push(rec[i][key[ii]])
                    }
                    
                }else{
                    value = rec[i][key] ;	
                }
            vector.push( value ) ;
	}
	return vector ;

}//-- end jx.utils.vector(key,rec) 

/**
* Extract keys from an associative array
* @param rec	associative array
*/
jx.utils.keys=function(rec){
	var keys = [] ;
	for(var id in rec){
            
		keys.push(id) ;
	}
	return keys ;
}//-- end jx.utils.keys
/**
 * This function will returnt he unique elements of a list
 * @param list  list of elements (duplicates are expected)
 */
jx.utils.unique = function (list,getKey){
    var obj = {}
    for(var i=0; i < list.length; i++){
    	if(list[i].constructor == Object && getKey != null){
		var key = getKey(list[i]) ;
		obj[key]  = list[i] ;

	}else{
		obj[list[i]]= 1 ;
	}
    }
    if(getKey == null){
	    return jx.utils.keys(obj);
    }else{
    	//
	// This will return the unique list of objects, provided the user has given a key extraction function
	// The key extraction function is analogous to the equal operator in C++
	//
    	return jx.utils.patterns.visitor(jx.utils.keys(obj),function(id){
		return obj[id] ;
	})
    }
}
/**
 * Implementation of a few standard design patterns. Their use is user/dependent
 * For more information on how/when to use a design pattern please use google/wikipedia ;-)
 */
jx.utils.patterns = {}
jx.utils.patterns.visitor = function(list,pointer){
	var rlist = [] ;
    for(var i=0; i < list.length; i++){       
        value = pointer(list[i]) ;
		if(value != null){
			rlist.push(value) ;
		}
    }
    return (rlist.length > 0)?rlist:[];
}
/**
 * Implementation of an iterator design pattern: i.e we use a sequence of objects and call a given method on them
 * This is a basic iterator design pattern 
 */
jx.utils.patterns.iterator = function(list,pointer){
    for(var i=0; i < list.length; i++){
        list[i][pointer]();
    }
}
/**
 * This is an implementation of an observer design pattern, the obervers will just have to call notify on the subject
 * The observers' role is to render some stuff on the ui, having said this, this design pattern is suited for ui & asynchronous tasks
 * @param lobservers	list of observers
 * @param init			pointer to be called on each observer to trigger it
 */
jx.utils.patterns.observer = function(lobservers,init){
	var p = {} ;	//-- specification of the subject
	p.index = 0;
	p.nodes = lobservers ;
	p.pointer = init;
	p.notify = function(){
		//
		// This function is designed to be called by the observers
		//
		if( this.index < this.nodes.length){
			this.start() ;
		}
	}
	p.start = function(){
		var observer = this.nodes[this.index];
		try{
			++this.index;
			if(this.pointer.constructor == String){
				observer[this.pointer](this) ;	
			}else{
				this.pointer(observer);
				this.notify() ;
			}
			
			
			
		}catch(e){
			//
			// if an exception was thrown, chances are were unable to increment and call notify
			// In the spirit of "The show must go on", we will make the notify call here for the failed observer
			//
			++this.index ;
			this.notify();
			
		}
		
	}
	//
	// let's fire the design pattern
	//
	p.start() ;
}

/**
* Apply a function to an array (visitor-like design pattern)
* @param fn	casting function on the vector or array of data
* @param list	array of numeric data (hopefully)
* @return 	array containing casted type
*/
jx.utils.cast = jx.utils.patterns.visitor ;
