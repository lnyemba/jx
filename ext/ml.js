/**
* Simple Javascript eXtension - 1.0, Machine Leanring Module
* (c) 2011 - 2015 Steve L. Nyemba, steve@the-phi.com
* License GPL version 3.0
*
* dependencies:
*	jx.utils	collection of utilities and design patterns used 
*	jx.math		various math & statistical functions
* This file implements a few reusable machine learning models/techniques
* 
* jx.ml.mapreduce	Performs a standard/basic mapreduce (single thread for now)
* jx.ml.regression	Will perform linear & logistic regressions 
*/
* 
if(!jx){
	var jx = {} ;
}
jx.ml = {}
/**
* The function performs map/reduce and at the very least map i.e the reduce function is optional
*/
jx.ml.mapreduce = function(data,fn_map,fn_reduce){
	//
	// insure that the mapping function has been provided
	//
	var __map = {}
	var emit = function(id,mvalue){
		if(__map[id] == null){
			__map[id] = []
		}
		__map[id].push(mvalue) ;
	}//-- end of the emitter
	if(data.constructor != Array){
		jx.utils.patterns.visitor(data,function(id){
			fn_map(data[id],emit) ;
		});
	}else{
		jx.utils.patterns.visitor(data,function(i){
			fn_map(data[i],emit) ;
		});
	}

	if(fn_reduce != null){
		//
		// We will be performing a reduce operation at this point

		var ids = jx.utils.keys(__map) ;
		jx.utils.patterns.visitor(ids,function(id){
			return __map[id] = fn_reduce(id,__map[id]) ;
		});
	}

	return __map ;

}//-- 

/**
 * The modules developed below will perform linear regression and logistic regression
 */
jx.ml.regression = {}

