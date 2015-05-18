/**
* Simple Javascript eXtension - 1.0
* (c) 2011 - 2015 Steve L. Nyemba, steve@the-phi.com
* License GPL version 3.0
*  
* Handling of DOM objects will rely on DOM object identifiers (ID) with a few exceptions. 
* The focus of a dom object is mostly centered around a single DOM object, 
* We advise using utils.js in order to handle collections of DOM objects as utils.js implements various utilities and industry standard design patterns 
* 
* This implementation is designed by W3C specifications of HTML5 and will integrate well with other frameworks that do so.
* In addition we tried to mildly specify preconditions for executions of functions.
* Architecturally the namespace serves as a wrapper around common DOM based tasks and can/should be cross-browser compatible because based on W3C standards
*
* LICENSE: GPLv3:
*  This program comes with absolute NO WARRANTY or implied warranty and is free to use for any purpose: modified, integrated, distributed at will.
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

    return document.getElementById(id) != null ;
}
/**
 * This function will remove a node given it's identifier
 * @pre jx.dom.exists(id)
 * @param {type} id
 * @returns {undefined}
 */
jx.dom.remove = function(id){
    var _item = null;
    if (id.constructor == String){
            _item = jx.dom.get.instance(id)
    }else{
            _item = id ;
    }
    _item.parentNode.removeChild(_item) ;
    
}

/**
 * Append a child to DOM  to a given DOM object provided the identifier
 * @pre jx.dom.exists(id) && _child != null
 * @param id    identifier of the DOM object
 * @param _child    child dom object 
 */
jx.dom.append = function(id,_child){
	var _parent = jx.dom.get.instance(id) ;
	_parent.appendChild(_child) ;
}

/**
 * This function will show a DOM object (assuming the DOM was hidden or not)
 * @pre jx.dom.exiss(_id)
 * @param _id   DOM object identifier
 */
jx.dom.show = function(_id){
	_dom = jx.dom.get.instance(_id) ;
	_dom.style.display = null;
}

/**
 * This function will hide a DOM object (assuming the DOM is visible or not)
 * @pre jx.dom.exiss(_id)
 * @param _id   DOM object identifier
 */
jx.dom.hide = function(_id){
	_dom = jx.dom.get.instance(_id) ;
	_dom.style.display = 'none' ;
}
/**
 * This function allow extraction from an select tag, if mutil selection is enabled an array is returned otherwise a scalar or string
 * The function also supports accessing a user defined attribute if specified otherwise it will use the default 'value', text can be specified
 * @param {type} id
 * @param {type} field
 * @returns {Array|jx.dom.get.dropdown.value}
 */
_getdropdownvalue = function(id,field){
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
_getcheckboxvalue = function(id){
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
_getradiovalue = function(id){
    return _getcheckboxvalue(id);
}
/**
 * Returns the input value of an input with type == text|password
 * @param {type} id
 * @returns {document@call;getElementById.value}
 */
_getinputvalue = function(id){
    _input = document.getElementById(id) ;
    return _input.value ;
}
/**
 * This function returns the value of a SPAN|DIV
 * @pre jx.dom.exists(id)
 */
_getspanvalue = function(id){
    _input = document.getElementById(id) ;
    return _input.innerHTML ;
}

jx.dom.get = {} ;
/** 
 * This function will return either a newly created dom object or an existing one if passed an identifier {name|id}
 * @pre : jx.dom.exists(id) == true || id.match(/<htmlTag>/i)
 * @post: jx.dom.get.instance(id) != null
 * @returns {NodeList|obj|Element}
 */
jx.dom.get.instance = function(id){
    if(jx.dom.exists(id)){
        obj = (document.getElementById(id)) ;
        if(obj == null){
            obj = document.getElementsByName(id)
            if(obj.length == 1){
                obj = obj[0]
            }else{
                obj = null;
            }
        }
    }else{
        obj = document.createElement(id)
    }
    return obj ;
}
/**
 * This function will return the value of a dom object regardless of the object
 * @pre : jx.dom.exists(id) == true
 * @post: No Exception is Thrown 
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
    pointer['SELECT']  = _getdropdownvalue ;   
    pointer['SPAN']    = _getspanvalue;
    pointer['DIV']     = _getspanvalue;

    pointer['CHECKBOX']= _getcheckboxvalue;
    pointer['RADIO']   = _getradiovalue ;
    pointer['INPUT']   = _getinputvalue;
   
    return pointer[key](id)
   
}
/**
 * This function returns an attribute for a given DOM object
 * @pre jx.dom.exists(id)
 * @post: none
 */
jx.dom.get.attribute = function(id,field){
    _dom = jx.dom.get.instance(id)
    return _dom.getAttribute(field) ;
}
/**
 * This function returns a list of children nodes provided an existing node identifier
 * @pre : jx.dom.exists(id) || jx.dom.get.instance(id) != null
 * @post: jx.dom.get.children(id).length >= 0
 * @param {type} id
 * @returns {Array|list}
 */
jx.dom.get.children = function(id){
    list = [] ;
    if(id.constructor == String){
        nodes = document.getElementById(id).childNodes ;
    }else{
        nodes = id.childNodes;
    }
    for(var i=0; i < nodes.length; i++){
        node = nodes[i];                        
        if(node.nodeName.match('^#.*') == null){
            list.push(node) ;
        }
    }
    return list ;    
}


_setinputvalue = function(id,value){
    _input = document.getElementById(id) ;
    if(_input.value == null){
        _input.innerHTML = value
    }else{
        _input.value = value;
    }
}
/**
 * ref _setinputvalue
 * The following are aliases intended for a more readable codebase, the just set a value to {DIV,SPAN,INPUT(text|password)}
 */
_setspanvalue   = _setinputvalue;
_setdivalue     = _setinputvalue
_setcheckbox = function(id,value){
    _checkboxes = document.getElementsByName(id)
    for(i in _checkboxes){
        if(checkbox.value == value){
            checkbox.checked = true;
            break;
        }
    }
}
_setradiobox = _setcheckbox ;
_setdropdown = function(id,field,value){
    _select = document.getElementById(id) ;
    if(value == null && field != null){
        aux = field ;
        field = 'value' ;
        value = aux ;
    }
    options = _select.options;
    for(i in options){
        if(options[i][field] == value){
            options[i].selected = true ;
            break;
        }
    }
}
jx.dom.set = {} ;
/**
 * This function will set a value to a dom object on a page
 * @pre : jx.dom.exists(id) == true
 * @post: No Exceptio is Thrown
 */
jx.dom.set.value= function(id,value){
    obj = document.getElementById(id) ;
    if(obj != null){
        key = obj.tagName ;
    }else {
        obj = document.getElementsByName(id)
        if(obj != null){
            key = obj[0].tagName ;
        }
    }

    if(key.match(/div|span|textarea/i) || (key.match(/input/i)&& obj.type.match(/text|password/i) ) ){
    	if(key.match(/input/i) == null){
		obj.innerHTML = value ;
	}else{
		obj.value = value;
	}
    }
    
}
/**
 * This function sets an attribute a value to a given attribute or creates and sets it otherwise
 * @pre : jx.dom.exists(id)
 * @post: jx.dom.get.attribute(id,field) == value || or none
 */
jx.dom.set.attribute = function(id,field,value){
    _dom = jx.dom.get.instance(id) ;
    _dom.setAttribute(field,value) ;

}
/**
 * This function acts as a wrapper to set the style of a dom object
 * @returns {undefined}
 */
jx.dom.set.style = function(id,field,value){
    _dom = jx.dom.get.instance(id) ;
    _dom.style[field] = value;
}
/**
 * This function will set the css class name of a DOM object and override any existing one
 * @pre : jx.dom.exists(id)
 * @post: jx.dom.get.attribute(id,'className') == value
 * @returns {undefined}
 */
jx.dom.set.css = function(id,value){
    _dom = jx.dom.get.instance(id) ;
    _dom.className = value;
}
/**
 * This function will set the focus on a given DOM object
 * @param {type} id
 * @returns {undefined}
 */
jx.dom.set.focus = function(id){
    _dom = jx.dom.get.instance(id) ;
    _dom.focus();
}

