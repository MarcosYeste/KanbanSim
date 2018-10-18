<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<jsp:include page="header.jsp"></jsp:include>
<head>
<meta charset="ISO-8859-1">
<title>USER FORM</title>
</head>
<body>

	<!-- Form to add users  -->
	<div class="row card mb-3 border-info mx-auto"
		style="max-width: 40rem;">

		<div class="card-header bg-info font-weight-bold">Crear Nuevo
			Usuario</div>

		<div class="card-body">

			<form:form modelAttribute="user" cssClass="form-horizontal"
				action="/addUser" method="post">
				<div class="form-group">

					<form:label cssClass="col-sm-3 " path="name">Nombre:</form:label>
					<div class="col-sm-12">
						<form:input cssClass="form-control" path="name"
							required="required" />
					</div>
					<form:label cssClass="col-sm-3 " path="rawPhases">Fases:</form:label>
					<div class="col-sm-12">
						<form:input cssClass="form-control" id="phaseCompiler" type="hidden" 
									value="" path="rawPhases"/>
					</div>
					<div>
						<thead>
							<c:forEach items="${allPhases}" var="phase">
							<input type="checkbox" class="userPhaseCheck" name="specs" value="${phase}" path="phases">
							<c:out value="${phase}"></c:out> 
							</c:forEach>
						</thead>
					</div>
					
					<div class="col-sm-12">
						<button type="submit" class="btn btn-primary">SAVE</button>
					</div>
				</div>
			</form:form>
		</div>
	</div>
	<script src="/resources/js/userFormSpecs.js"></script>
</body>
</html>