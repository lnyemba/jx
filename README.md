Javascript eXtension Framework
==
The simple **J**avascript e**X**tension framework or simply **Jx** is largely implemented around a facade design pattern to simplify common tasks on DOM objects.
The framework is organized by scope:
| dom.js|rpc.js|utils.js|math.js|ml.js|charts.js|
|-------|-------
|Implements DOM Object handling by providing an expressive interface| Implements an easy to use and expressive AJAX interface| Implements an set of reusable utilities for handling collections & design patterns| implements essential basic math (sets) & statistical functions| Implements some machine learning approaches like mapreduce| Implements an interface to jqplot|


**dom.js**

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
	
The simple **J**avascript e**X**tension framework (**Jx** in short) implements wrappers around common tasks performed on DOM object, JSON object and implements various utilities like design patterns for easy handling of collections as well as mathematic functions and some basic machine learning techniques and models. Jx doesn't get in the way of other frameworks like jQuery; Dojo; Mootools; Backbone; Boostrap. We put in a concerted effort to keep it simple yet useful.  

<Table>
<tr style="font-weight:bold; text-transform:capitalize" valign="center"><td>
dom.js
</td>
<td>utils.js</td>
<td>rpc.js</td>

</tr>
<tr style="font-size:11px">
<td>
This file is intended to handle DOM objects via <b>jx.dom</b> namespace. The namespace will rely on DOM object identifiers (ID) with a few exceptions of radio & checkboxes. The handling is mostly around getting and setting data on various attributes. 
<br>
We advise using utils.js in order to handle collections of DOM objects as utils.js implements various utilities and industry standard design patterns 
<br> 
This implementation is designed by W3C specifications of HTML5 and will integrate well with other frameworks that do so.
In addition we tried to mildly specify preconditions for executions of functions
</td>

<td>
 This file implements common utilities for managing JSON objects and collections. We have implemented the handling of collections around some well known design patterns, iterator, visitor and observer. We have chosen these considering the scope & context in which javascript is used. That being said they can be extended & optimized. They come in handy when handling collections of DOM objects (for example search, setting values on attributes)
</td>
<td>
This file is designed to handle http requests post, get, put of data and submitting form data as well. 

<b>HttpClient.instance</b> is a factory class provided to access to the interface and provide the functionality

</td>
</tr>
</table>
<b>rpc.js</b>: 
