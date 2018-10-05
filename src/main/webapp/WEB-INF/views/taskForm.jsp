<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<jsp:include page="header.jsp"></jsp:include>
<head>
<meta charset="ISO-8859-1">
<title>TASK FORM</title>
</head>
<body>

	<!-- Form That Creates new Tasks -->
		<div class="row card mb-3 border-info mx-auto" style="max-width: 40rem;">
			<div class="card-header bg-info font-weight-bold">Crear Nueva Tarea</div>
			<div class="card-body">
				<form:form modelAttribute="task" cssClass="form-horizontal"
					action="/addTask" method="post">
					<div class="form-group">
						<form:label cssClass="col-sm-3 " path="name">Nombre Tarea</form:label>
						<div class="col-sm-12">
							<form:input cssClass="form-control" path="name"
								required="required" />
						</div>
					</div>
					<div class="col-sm-8">
						<button type="submit" class="btn btn-primary">SAVE</button>
					</div>
			</div>
		</form:form>
	</div>

</body>
</html>