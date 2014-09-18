/**
 * The Phi Technology LLC, Steve L. Nyemba <steve@the-phi.com>
 * Javascript-x framework version 0.1
 * 
 * Handling of DOM objects will rely on DOM object identifiers (ID) with a few exceptions
 * This file handles DOM objects with a namespace implementation. 
 * The basic design is a wrapper around WC3 standard interface for a dom
 */

if(!jx){
    var jx = {}
}
jx.dom = {} ;
/**
 * Determines if a DOM object exists or not
 * @param {type} id
 * @returns {Boolean}
 */
jx.dom.exists = function(id){
    return document.getElement(id) != null || document.getElementsByName(id) != null ;
}
/**
 * This function allow extraction from an select tag, if mutil selection is enabled an array is returned otherwise a scalar or string
 * The function also supports accessing a user defined attribute if specified otherwise it will use the default 'value', text can be specified
 * @param {type} id
 * @param {type} field
 * @returns {Array|jx.dom.get.dropdown.value}
 */
_dropdownvalue = function(id,field){
        var _dom = document.getElementById(id) ;
        field = (field)?field:'value'
        var value = null;
        if(field!= null && _dom != null){
                value = []
                var option = 0;
                for(var i=0; i < _dom.options.length; i++){
                        option = _dom.options[i] ;
                        if(option.selected){
                                value.push(option[field])	
                        }
                }
                
        }
        if(value.length == 0){
            value = 0
        }else if (value.length == 1){
            value = value[0]
        }
        return value;    
}

/**
 * This function returns a value for checkboxes given a name
 * @param {type} id name of the checkboxes
 * @returns {value}
 */
_checkboxvalue = function(id){
    ldoms = document.getElementsByName(id) ;
    value = null;
    for(var i=0; i < ldoms.length; i++){
            if(ldoms[i].checked == true){
                    value = ldoms[i].value;
                    break;
            }
    }
    return value;    
}
_radiovalue = function(id){
    return _checkboxvalue(id);
}
/**
 * Returns the input value of an input with type == text|password
 * @param {type} id
 * @returns {document@call;getElementById.value}
 */
_inputvalue = function(id){
    _input = document.getElementById(id) ;
    return _input.value ;
}
_spanvalue = function(id){
    _input = document.getElementById(id) ;
    return _input.innerHTML ;
}

jx.dom.get = {} ;

/**
 * This function will return the value of a dom object regardless of the object
 * @param {type} id
 * @returns {undefined}
 */
jx.dom.get.value = function(id){
    obj = document.getElementById(id) ;
    if(obj == null){
        obj = document.getElementsByName(id) ;
        if (obj != null){
            obj = obj[0] ;
        }
    }
    //-- at this point we've tried two methods 
    if(obj == null){
        return null;
    }
    tag = obj.tagName ;
    if(tag.match(/input/i)){
        if(obj.type.match(/text|password/i)){
            key = 'INPUT'
        }else {
            key = obj.type ;
        }
    }else{
        key = tag ;
    }
   
    key = key.toUpperCase();
   
    pointer = {} ;
    pointer['SELECT']  = _dropdownvalue ;   
    pointer['SPAN']    = _spanvalue;
    pointer['DIV']     = _spanvalue;

    pointer['CHECKBOX']= _checkboxvalue;
    pointer['RADIO']   = _radiovalue ;
    pointer['INPUT']   = _inputvalue;
   
    return pointer[key](id)
   
}
jx.dom.get.children = function(id){}

jx.dom.set = {} ;
/**
 * This function will set a value to a dom object
 * @param {type} id
 * @param {type} value
 * @returns {undefined}
 */
jx.dom.set.value= function(id,value){
    obj = document.getElementById(id) ;
    tag = obj.tagName ;
}

