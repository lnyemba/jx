Simple Javascript eXtension Framework
==

The simple Javascript eXtension framework (jx in short) implements wrappers around common tasks performed on DOM object, JSON object and implements various utilities like design patterns for easy handling of collections as well as mathematic functions and some basic machine learning techniques and models. Jx doesn't get in the way of other frameworks like jQuery; Dojo; Mootools; Backbone; Boostrap. We put in a conerted effort to keep it simple.  


dom.js: Handles common tasks around a dom object with a simple interface
Example:
<html>
    <select id="dropdown">
        <option value="one" selected>First Option</option>
        <option value="two">First Option</option>
    </select>    
</html>
value = jx.dom.get.value('dropdown')
