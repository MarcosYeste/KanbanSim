<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<jsp:include page="header.jsp"></jsp:include>
<head>
<meta charset="ISO-8859-1">
<title>USER FORM</title>
</head>
<body>
	<!-- Form to add users  -->
	<div class="row">

		<form:form modelAttribute="user" cssClass="form-horizontal"
			action="/addUser" method="post">
			<div class="form-group">

				<form:label cssClass="col-sm-3 " path="name">Nombre:</form:label>
				<div class="col-sm-12">
					<form:input cssClass="form-control" path="name" />
				</div>
				<form:label cssClass="col-sm-3 " path="specializations">Especialidades:</form:label>
				<div>
					<input id="addSpec" type="button" value="+"> <input
						id="rmvSpec" type="button" value="-">
				</div>
				<br>

				<div id="specContainer">
					<input id="spec1" type="text" name="especialidad1"><br>
				</div>
				<div class="col-sm-8">
				
				<button type="submit" class="btn btn-primary">SAVE</button>
			</div>
		</form:form>
	</div>
</body>
</html>