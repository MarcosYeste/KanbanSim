<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Add User</title>
</head>
<body>
	<form id="form" action="/addUser">
		<label>Nombre:</label><br> <input type="text" name="firstname"> <br> 
		<label>Especialidades:</label><input id="addSpec" type="button" value="+"><input id="rmvSpec" type="button" value="-"><br> 
		<div id="specContainer">
			<input type="text" name="especialidad1"><br>
		</div>
		 <br><br> 
		<input type="submit" value="Guardar">
	</form>
	<script>
		document.getElementById("addSpec").addEventListener("click", addNewNode, false);
		document.getElementById("rmvSpec").addEventListener("click", deleteLastNode, false);
		var i = 2;
		
		function addNewNode() {
			var elem = document.createElement("input");
			var br = document.createElement("br");
			var att = document.createAttribute("type");
			att.value = "text";
			var att2 = document.createAttribute("name");
			att2.value = "especialidad" + i;
			i+=1;
			elem.setAttributeNode(att);
			elem.setAttributeNode(att2);
			document.querySelector("#specContainer").appendChild(elem);
			document.querySelector("#specContainer").appendChild(br);
		}
		
		function deleteLastNode() {
			var container = document.querySelector("#specContainer");
			if (container.lastElementChild){
				container.removeChild(container.lastElementChild);
				container.removeChild(container.lastElementChild);
			}
		}

	</script>
</body>
</html>