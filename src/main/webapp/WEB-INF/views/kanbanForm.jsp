<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>
</head>
<body>
	<h1>${kanbanMSG}</h1>
	<p>Aqui irá el formulario</p>


	<form action="/add" modelAttribute="phases" method="post">

		<input type="submit" value="enviar">
	</form>
</body>
</html>