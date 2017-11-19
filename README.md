Javascript eXpressive Framework
==
<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
The goal of this framework is to provide an expressive wrapper around certain tasks so as to make Javascript code a bit readable. The approach leverages well known design patterns and guarantees compatibility with existing frameworks like JQuery, Mootools, Dojo, gRaphael, Jqplot ...

Additionally we organized the the interfaces into files that implement scopes. Making **Jx** truely expressive within a context defined by a scope:

| dom.js|rpc.js|utils.js|math.js|ml.js|charts.js|
|-------|-------|-------|-------|-------|-------|
| Handles DOM objects | Handles remote calls (AJAX) | Reusable collection handlers & design patterns | Essential math (sets) & statistical functions| Machine learning approaches like mapreduce | Implements an interface to jqplot|

The implementation is designed to provide to an expressive, workable and easy to use interface when working with Javascript
We use standard design patterns and have documented the code extensively for anyone to contribute

We have a [Nodejs port](https://github.com/lnyemba/jx-node.git). Due to the areas of application of nodejs, we have primarily enabled:

	* math.js 	for mathematics & statistic functions
	* ml.js: 	for machine learning
	* utils.js	for collection handling and design pattherns

#dom.js

This file handles DOM object operations with a simple interface. The namespace it belongs to is identified/prefixed by **jx.dom**
This will mostly refer to DOM objects by their identifiers 

**Preconditions**: The DOM object identifier must always be set 

**jx.dom.show**

	Makes a DOM Object visible
	applies: ALL

**jx.dom.hide**

	Makes a DOM Object invisible
	applies: ALL
	
**jx.dom.set.value**

	Sets the value of an object provided its identifier.
	applies: SELECT, DIV, SPAN, INPUT, TEXTAREA

**jx.dom.set.attribute**

	This function will set an attribute on a DOM object, the attributes can be standard or custom
	applies: ALL
	
**jx.dom.set.css**

	This function will set a css to an existing className object of a DOM object
	applies: ALL
**jx.dom.set.style**
	
	This function will set an attribute on the style object. 
	It is equivalent to adding an inline css entry to a DOM object
	applies: ALL
	
**jx.dom.set.focus**
		
	This function will allow focus on a DOM object that permits it
	applies: INPUT
		
**jx.dom.get.instance**
		
	This function will return an existing DOM object or create a new one:
		- If a DOM identifier is entered it will return the DOM Object
		- If a keyword is provided it will create an instance of the DOM Object
	applies: ALL
	
**jx.dom.get.value**

	Returns the value from a DOM Object provided an identifier
	applies: SELECT,DIV, SPAN,INPUT, TEXTAREA
	
**jx.dom.get.children**
	
	Returns the list of children nodes under a specified DOM object
	applies: ALL
	
**jx.dom.append**
	
	Appends a DOM object to an existing one that is specified an identifier
	applies: ALL
	
**jx.dom.remove**

	Removes a DOM object from it's parent, and returns the object.
	applies: ALL
	
#rpc.js

This file implements a expressive **AJAX** handler that is W3C Compliant: This makes it incompatible with versions of Internet Explorer that are not W3C compliant.

**HttpClient.instance**

This class creates an AJAX handler to the calling code.
	
	example:
	var httpclient = HttpClient.instance()

The object has the following interface once instanciated. We assume the object created is called httpclient

**httpclient.setData(_object_)**
	
This function will set data that will be processed with a request (POST|PUT)
The object set can be of any type

**httpclient.setHeader(_key_,_value_)**

This function is designed to set the headers that will be processed with a request (GET|POST|PUT)
	
	parameters:
		key	key of the header
		value	value associated with the key
		
	NOTE: will override existing keys
	
**httpclient.<get|post|put>(_url_,_callback_)**

This function will process a GET, POST, PUT request against a given endpoint 

	url:	Endpoint (or API)
	callback: call back that handles the the enpoints response
	
