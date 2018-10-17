<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<jsp:include page="header.jsp"></jsp:include>

<body>

	<div class="row card mb-3 border-info mx-auto"
		style="max-width: 45rem;">
		<div class="card-header bg-info font-weight-bold">Crear Nueva
			Fase</div>
		<div class="card-body">
			<form:form modelAttribute="fase" cssClass="form-horizontal"
				action="/addFase" method="post">
				<div class="form-group">
					<form:label cssClass="col-sm-3 " path="name">Nombre</form:label>
					<div class="col-sm-12">
						<form:input cssClass="form-control" path="name"
							required="required" />
					</div>
				</div>
				<div class="form-group">
					<form:label cssClass="col-sm-3 " path="maxTasks">Tareas Máximas</form:label>
					<div class="col-sm-12">
						<form:input cssClass="form-control" path="maxTasks"
							required="required" />
					</div>
				</div>
				

				<div class="col-sm-8">
					<button type="submit" class="btn btn-primary">SAVE</button>
				</div>
			</form:form>
		</div>
	</div>

</body>
</html>