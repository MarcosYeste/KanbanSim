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
	<script src="/resources/js/userFormSpecs.js"></script>
</body>
</html>