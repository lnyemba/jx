jx
==

Javascript-X framework is a framework is that implements DOM handling, implements various utility functions as well as design patterns and extends some math functionalities. It is very compatible with other frameworks


dom.js: Handles common tasks around a dom object with a simple interface
Example:
<html>
    <select id="dropdown">
        <option value="one" selected>First Option</option>
        <option value="two">First Option</option>
    </select>    
</html>
value = jx.dom.get.value('dropdown')
