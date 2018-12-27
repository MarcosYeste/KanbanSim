<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban Simulator</title>
<jsp:include page="/resources/links&Scripts/layout.jsp"></jsp:include>

<link rel="stylesheet" href="/resources/css/kanban.css">
</head>
<body>




	<h1 class="textoInicio">KANBAN SIMULATOR</h1>
<form:form action="/plantilla"  modelAttribute="plantilla" method="POST">
 <div class="indexForm">
	<div class="form-group">
	<label for="plant"> Elige una opción para generar Kanban</label>
	<select id="plant"  class="form-control col-md-4">
		<option value ="new">Nuevo Kanban</option>
		<c:forEach items="${plantillas}" var="plantilla">
		 								<!--  ID  -->     					<!--  NAME  -->
		 <option value="<c:out value="${plantilla}"></c:out>"><c:out value="${plantilla}"></c:out></option> 
		 
		 </c:forEach>
	</select>
	
	</div>
	<button type="submit" class="btn btn-primary">Generar</button>
</div>
</form:form>

<script src="/resources/libs/js/jquery-3.3.1.js"></script>
<script src="/resources/libs/js/jquery-ui/jquery-ui.min.js"></script>
<script src="/resources/libs/js/popper.min.js"></script>
<script src="/resources/libs/css/bootstrap/4.1.3/js/bootstrap.min.js"></script>
</body>
</html>