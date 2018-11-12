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

		<div class="row card mb-3 border-info mx-auto" style="max-width: 40rem;">
			<div class="card-header bg-info font-weight-bold">Configuración de Backlog</div>
			<div class="card-body">
				<p>Entrada de tareas</p>
				<div>
					<input type="radio" name="taskInputMode" class="distributionRadio" value="manual"/> Manual
					<input type="radio" name="taskInputMode" class="distributionRadio" value="constant"/> Constante	
				</div>
				
				<p>Distribución</p>
				<div>
					<input type="radio" name="distributionType" class="distributionRadio" value="normal" checked disabled>Normal
					<input type="radio" name="distributionType" class="distributionRadio" value="poison" disabled>Poison
					<input type="radio" name="distributionType" class="distributionRadio" value="weight" disabled>Con peso
				</div>
				
				
				<div id="distributionData">
					
				</div>
			</div>
				<div class="col-sm-8">
					<button id="modBacklogBtn" class="btn btn-primary">SAVE</button>
				</div>
			
		</div>
<script src="/resources/js/backlogconf.js"></script>
</body>
</html>