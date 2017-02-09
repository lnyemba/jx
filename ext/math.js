/**
* Simple Javascript eXtension - 1.0, Mathematics Module
* (c) 2011 - 2015 Steve L. Nyemba, steve@the-phi.com
* License GPL version 3.0
*
* dependencies:
*	utils.js	implementation of design patterns and utilities
*
* This file contains an enhancement of utilities integrated into the jx.math.* built-in package of javascript
* Because we implement math and numerical functions it is to be understood that most of the functions will have common preconditions 
* i.e lxi.constructor == Array && isNumber(lxi) unless specified otherwise

* jx.math.max
* jx.math.min
* jx.math.sum
* jx.math.prod
* jx.math.freq
* jx.math.avg
* jx.math.mean		computes the mean/average of a list of observations (arthmetic mean included too)
* jx.math.sd		computes the standard deviation of a list of observations
* jx.math.var		computes the variance of a list of observations
* jx.math.diff		computes the absolute difference of values in an array
* jx.math.fibonacci	comptutes the fibonacci value of a given number
* jx.math.factorial	computes the factorial of a given number
*/
if(!jx){
	var jx = {} ;

}
jx.math = {}
jx.math.sqrt = Math.sqrt;
jx.math.PHI = (1+jx.math.sqrt(5))/2 ;//1.61803399 ;

/**
* @param lxi list of observatins xi
*/

jx.math.max = function(lxi){
 sortNumber= function(a,b) {
    return a - b;
    }
	 index = lxi.length -1 ;
	 max = jx.utils.cast(lxi,Number).sort(sortNumber)[index] ;	// perhaps need to cast
	 return max ;
}
/**
* finds the minimum of a list of observation lxi (vector of values)
* @param lxi list/vector of values/observations
*/
jx.math.min = function(lxi){
	sortNumber = function(a,b){
		return a- b;
	}
	min = jx.utils.cast(lxi,Number).sort(sortNumber)[0] ;
	return min ;
}
/**
* @pre : values.constructor == Array
* @param lxi list of observed values to be summed
*/
jx.math.sum = function(lxi){
    return eval(lxi.join('+'));
} ;
/**
* This function will compute the frequency of a vector i.e providing relative values 
*/
jx.math.freq = function(lxi){
	var N = jx.math.sum(lxi) ;
	return jx.utils.patterns.visitor(lxi,function(xi){
		return xi/N ;
	});
}
/**
 * This function will perform the product of a vector
 * @pre	lxi.constructor == Array && isNumber(lxi)
 */
jx.math.prod = function(lxi){
	return eval(lxi.join('*')) ;
}
/**
* @pre : lni != null && lxi.length == lni.length
* @param lxi list of observed values
* @param lni list of the number of times observations of index i have been made
*/
jx.math.avg = function(lxi,lni){
    N = lxi.length  ;
    if(lni == null){
        return jx.math.sum(lxi)/N ;
    }else{
        values = []
        for(var i=0; i < lxi.length; i++){
            values[i] = Number(lxi[i])*Number(lni[i]) ;
        }
        return Number(jx.math.sum(values)/N) ;
    }
};

/**
* This function will repete a value a given number of times
* @pre times > 0
*/
jx.math.rep = function(value,times){
	var lvalues = []
	for(var i=0; i < times; i++){
		lvalues.push(value) ;
	}
	return lvalues;
}
jx.math.mean = jx.math.avg ;
/**
* This function will compute the mode of a given vector
* The mode is by definition the most frequent item in the vector
*/
jx.math.mode = function(x) {
	var N = x.length ;
	map = {}
	var max =0;
	var value = 0;
	for(var i in x){
		id = x[i]  ;
		if(map[id] == null){
			map[id] = 0 ;
		}
		map[id] = map[id] + 1 ;
		if(map[id] > max){
			value = id ;
			max = map[id] ;
		}
	}
	var value = jx.utils.patterns.visitor(jx.utils.keys(map),function(id){
		if(map[id] == max){
			return Number(id) ;
		}else{
			return null;
		}
	})
	return value.length == 1?value[0]:value ;
}
jx.math.pow = Math.pow
jx.math.sd = function(lxi,lni){
    N = lxi.length ;
    mean = jx.math.mean(lxi,lni) ;

    sqr = [] ;
    for(var i=0; i < lxi.length ;i++){
       sqr[i] = jx.math.pow((Number(lxi[i])-mean),2 ) ;
    }

    total = jx.math.sum(sqr);

    return jx.math.sqrt(total/(N-1)) ;
} ;
/**
* This function computes the correlation between two vectors
* @pre x1.length == x2.length
*/
jx.math.cor = function(x1,x2){
	return jx.math.cov(x1,x2) / (jx.math.sd(x1)*jx.math.sd(x2))
}
/**
* This function will compute the covariance of 2 vectors
* @pre x1.length == x2.length
*/
jx.math.cov = function(x1,x2){
	var u1 = jx.math.mean(x1) ;
	var u2 = jx.math.mean(x2) ;
	var N = x1.length ;
	var value = 0
	for(var i in x1){
		value += (x1[i] - u1) * (x2[i] - u2)
	}
	return value / (N - 1)
}

/**
* Computes the factorial of a given value
*/
jx.math.factorial = function(value){
    r =value;
    for(var i =value-1; i > 0; i--){
        r *= i ;
    }

    return r;
} ;

/**
* Computes the fibonacci value of a given number using the golden ratio
*/
jx.math.fibonacci = function(value){
    r = (jx.math.pow(jx.math.PHI,value)/jx.math.sqrt(5)) + 0.5 ;
    return jx.math.floor(r) ;
} ;

/**
* computes the absolute difference of values in a list of observations
*/
jx.math.diff = function(lxi){
    var r = [] ;
    var x,y;
    for(var i=0; i < lxi.length-1; i++){
        x = lxi[i] ;
        y = lxi[i+1] ;
        r.push(y-x)
    }
    return r ;
};

/**
 * This section implements a few handlers based on sets
 */
jx.math.sets = {} ;
/**
 * This function will perform a unique operation of values/objects
 * @param list	list/vector of values or objects
 * @param equals	operator to be used, only provide this for complex objects
 */
jx.math.sets.unique = jx.utils.unique ;
/**
 * This function will perform the union of 2 sets (objects, or values)
 * @param list1		list/vector of values or objects
 * @param list2		list/vector of values or objects
 * @param equals	operator to be used to evaluate equality (use this for complex objects)
 */
jx.math.sets.union = function(list1,list2,equals){
	runion = [] ;
	runion = list1.concat(list2) ;
	runion = jx.math.sets.unique(runion,equals)
	return runion;
}

/**
* This function will normalize values within a vector
* By definition normalization is (x - u) / sd (assuming population parameters are known)
*/
jx.math.normalize = function(lvalues){
        
       if(lvalues[0].constructor == Array){
            m = []
            
            for(i in lvalues[0]){
                //
                // We are putting the parameters of every column together,
                // Once this is done we can update every sample of the matrix with normalized values
                //
                row= jx.utils.vector(i,lvalues)
                xo = jx.math.normalize(row)
                xo = {}
                xo.mean = jx.math.mean(row)
                xo.sd   = jx.math.sd(row)
                m.push(xo)
                
            }
            //
            // Normalizing the matrix with acquired parameters
            //
            for(i in lvalues){
                var row = lvalues[i]
                for (j in m){
                    var params = m[j]
                    row[j] = (row[j] - params.mean)/params.sd
                }
                lvalues[i] = row
            }
            
            return lvalues
        }else{
                
		mean = jx.math.mean(lvalues) ;
		sd = jx.math.sd(lvalues) ;
		return jx.utils.patterns.visitor(lvalues,function(x){
			return ((x - mean) / sd)
		})
        }}

/**
 * This function will scale a feature vector over it's range
 */
jx.math.scale = function(lvalues,percent){
    if (lvalues[0].constructor == Array){
       m = []
            
            for(i in lvalues[0]){
                //
                // Computing parameters to perform feature scaling
                // max, min to compute range
                //
                row= jx.utils.vector(i,lvalues)
                xo = {}
                xo.max = jx.math.max(row)
                xo.min = jx.math.min(row)
                m.push(xo)
                
            }
            //
            // Performing feature scaling of the matrix here
            //
           for(i in lvalues){
               var row = lvalues[i]
               for(j in m){
                   var params = m[j]
                   row[j] = (row[j] - params.min)/params.max
            }
            lvalues[i] = row
        }
            return lvalues    
               
    }else{
	max = jx.math.max(lvalues) ;
	min = jx.math.min(lvalues) ;
	return jx.utils.patterns.visitor(lvalues,function(x){
		var value =  (x - min ) / max  ;
		if(percent == true){
			return (100*value).toFixed(2)
		}else{
			return value ;
		}
	})
    }
}
/**
* This is a lightweight map reduce infrastructure
*/
jx.mr = {} ;
/**
* This function will perform a map on a given id in rec, then will call emit with the
*/
jx.mr.map = null
/**
* @param keys
* @param values array of values that were mapped
*/
jx.mr.reduce = null;
jx.mr.mapreduce = function(data,fn_map,fn_reduce){
	if (fn_map == null){
		throw new "Map function is not defined"
	}
	map = {} ;
	emit = function(id,values){
		if(map[id] == null){
			map[id]  = []
		}
		map[id].push(values);
	}
	if(data.constructor != Array){
		for (id in data){
			//rec = data[id] ;
			rec = {}
			rec['__id'] = id;
			rec['data'] = data[id] ;
			fn_map(rec,emit)

		}
	}else{
		for (var i=0; i < data.length; i++){
			rec = data[i];
			fn_map(rec,emit);
			//if(i == 2)break;
		}
	}
	if(fn_reduce != null){
		keys = jx.utils.keys(map) ;
		m = {}
		for(var i=0; i < keys.length; i++){
			id = keys[i] ;
			values = map[id] ;
			value = fn_reduce(id,values) ;
			id = keys[i] ;
			m[id] = value;

		}
		map = m

	}
	return map ;
}
