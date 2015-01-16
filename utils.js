/**
* jxf version 0.9
* This file contains the compilation of utilities for miscellaneous/unsorted operations:
*	casting
*	vector extraction from associative array
*	list of keys from an associative array
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
jx.utils.unique = function (list){
    var obj = {}
    for(var i=0; i < list.length; i++){
        obj[list[i]]= 1 ;
    }
    return jx.utils.keys(obj);
}
/**
 * Implementation of a few standard design patterns. Their use is user/dependent
 * For more information on how/when to use a design pattern please use google/wikipedia ;-)
 */
jx.utils.patterns = {}
jx.utils.patterns.visitor = function(list,pointer){
	rlist = [] ;
    for(var i=0; i < list.length; i++){       
        value = pointer(list[i]) ;
	if(value != null){
		rlist.push(value) ;
	}
    }
    return (rlist.length > 0)?rlist:list;
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
	p = {} ;	//-- specification of the subject
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
		observer = this.nodes[this.index];
		try{
			observer[this.pointer](this) ;
			++this.index;
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

/**
* Print a dom object to system defined printer (Physical; Network or File)
* @param id	id of a DOM object
*/
jx.utils.print = function(id){}

/**
* The following namespace handles searches in depth & in breath.
*/
jx.utils.search = function(id,keywords,attrib){
	var lattr = null;
	attrib = (attrib == null)?['innerHTML','value']:attrib;
	if(attrib.constructor == Array){
		lattr = attrib;
	}else{
		lattr = [attrib] ;
	}

	regex = keywords.toLowerCase();
	ldoms = jx.dom.get.children(id) ;
	//ldoms.push(document.getElementById(id)) ;
	var imatch = function(_dom){
		obj = null;
		for(var j=0; j < lattr.length; j++){
			id = lattr[j] ;
			str = _dom[id] ;
			str = (str != null)?str.toLowerCase():str;
			if(str == null){
				continue;
			}else if(str.match(regex) != null){
					obj = _dom.cloneNode(true) ;
					
				}

		}
		return obj;
	}
	lmatches = jx.utils.patterns.visitor(ldoms,imatch)
	return lmatches ;
}

module.exports.utils = jx.utils ;
