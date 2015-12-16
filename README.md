Simple Javascript eXtension Framework
==

The simple Javascript eXtension framework (jx in short) implements wrappers around common tasks performed on DOM object, JSON object and implements various utilities like design patterns for easy handling of collections as well as mathematic functions and some basic machine learning techniques and models. Jx doesn't get in the way of other frameworks like jQuery; Dojo; Mootools; Backbone; Boostrap. We put in a concerted effort to keep it simple yet useful.  

<b>dom.js</b>:

This file is intended to handle DOM objects via <b>jx.dom</b> namespace. The namespace will rely on DOM object identifiers (ID) with a few exceptions of radio & checkboxes. The handling is mostly around getting and setting data on various attributes. 
The focus of a dom object is mostly centered around a single DOM object, 

We advise using utils.js in order to handle collections of DOM objects as utils.js implements various utilities and industry standard design patterns 
 
This implementation is designed by W3C specifications of HTML5 and will integrate well with other frameworks that do so.
In addition we tried to mildly specify preconditions for executions of functions

<b>rpc.js</b>: 
This file is designed to handle http requests post, get, put of data and submitting form data as well as uploading of files. The interface we have chosen is intended to be simple:
<b>HttpClient.instance</b> Creates an instance of an httpclient
<b>httpclient.get</b>(:url,:callback)
 The object's member performs an http call with GET method and a callback method
 
<b>utils.js</b>:
Implementation of miscellaneous utilities commonly used, These functions are reusable and simple:

<b>jx.utils.vector</b>	extracts a vector from an array of objects (or a matrix)
<b>jx.utils.keys</b> extract keys from an associative array
<b>jx.utils.unique</b>				returns unique objects in an array, including array of objects (provided an key function)

<b>jx.utils.patterns</b>: 		
Implementation of design patterns defined by the GOF http://en.wikipedia.org/wiki/Software_design_pattern

<b>jx.utils.patterns.visitor</b>		The visitor design pattern
<b>jx.utils.patterns.iterator</b>	The iterator design pattern
<b>jx.utils.patterns.observer</b> 	The observer design pattern

<b>ext/math.js</b>:

<b>ext/ml.js</b>:
