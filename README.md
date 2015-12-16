Simple Javascript eXtension Framework
==

The simple Javascript eXtension framework (jx in short) implements wrappers around common tasks performed on DOM object, JSON object and implements various utilities like design patterns for easy handling of collections as well as mathematic functions and some basic machine learning techniques and models. Jx doesn't get in the way of other frameworks like jQuery; Dojo; Mootools; Backbone; Boostrap. We put in a concerted effort to keep it simple yet useful.  

<Table>
<tr style="font-weight:bold; text-transform:capitalize" valign="center"><td>
dom.js
</td>
<td>rpc.js</td>
</tr>
<tr style="font-size:11px">
<td>
This file is intended to handle DOM objects via <b>jx.dom</b> namespace. The namespace will rely on DOM object identifiers (ID) with a few exceptions of radio & checkboxes. The handling is mostly around getting and setting data on various attributes. 
The focus of a dom object is mostly centered around a single DOM object, 

We advise using utils.js in order to handle collections of DOM objects as utils.js implements various utilities and industry standard design patterns 
 
This implementation is designed by W3C specifications of HTML5 and will integrate well with other frameworks that do so.
In addition we tried to mildly specify preconditions for executions of functions
</td>
<td>
This file is designed to handle http requests post, get, put of data and submitting form data as well. 

<b>HttpClient.instance</b> is a factory class provided to access to the interface and provide the functionality

</td>
</tr>
</table>
<b>rpc.js</b>: 
