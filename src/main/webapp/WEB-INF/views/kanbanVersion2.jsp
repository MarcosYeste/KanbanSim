<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>
<link rel="stylesheet" href="/resources/css/kanban.css">
</head>
<body>


<%-- 	<table class="table table-bordered">
		<thead>
			<tr>
				<th scope="col">Inicio</th>
				<c:forEach items="${phases}" var="fase">
					<th scope="col" class="mw=10"><c:out value="${fase.name}"></c:out></th>
				</c:forEach>
				<th scope="col">Fin</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${task}" var="task">
				<tr>

					<td><c:out value="${task.name}"></c:out></td>


					<td scope="col" class="text-center"><c:out value="${task.name}"></c:out></td>

				</tr>
			</c:forEach>



		</tbody>
	</table>
	<br>
	<br> --%>

	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
		</p>

	</c:forEach>



	<div class="contenedor">

		<div class="principio">
			<div class="titulo">Etapa de inicio</div>
			<div class="titulo barra"></div>
			<div class="contenedorTareas">
				<c:forEach items="${task}" var="task">
					<div class="tareas">
						<c:out value="${task.name}"></c:out>
					</div>
				</c:forEach>
			</div>

		</div>

		<div id="faseDiv" class="fase">


			<c:forEach items="${phases}" var="fase">
				<div class="faseName">

					<div class="titulo">
						<c:out value="${fase.name}"></c:out>
					</div>

					<div class="subfase">
						<div>Doing</div>
						<div>Done</div>
					</div>
				</div>
			</c:forEach>
		</div>


		<div class="fin">
			<div class="titulo">Etapa final</div>
			<div class="titulo barra"></div>
		</div>
	</div>











	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>