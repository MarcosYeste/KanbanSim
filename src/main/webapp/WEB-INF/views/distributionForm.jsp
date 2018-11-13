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
					<input type="radio" name="taskInputMode" class="distributionRadio" value="manual" checked/> Manual
					<input type="radio" name="taskInputMode" class="distributionRadio" value="constant"/> Constante	
				</div>
				
				<p>Distribución</p>
				<div>
					<input type="radio" name="distributionType" class="distributionRadio" value="normal" disabled>Normal
					<input type="radio" name="distributionType" class="distributionRadio" value="poisson" disabled>Poisson
					<input type="radio" name="distributionType" class="distributionRadio" value="weight" disabled>Con peso
				</div>
				
				
				<div id="distributionData">				
					<p id="paramTitle" style="visibility: collapse; height: 0px">Parametros:</p>
							
					<div id="dataNormalDistribution" style="visibility: collapse; height: 0px">
						<p>Base:</p> <input type="number" id="normalBaseValue" name="base" value="1" min="1">
						<p>Varianza:</p> <input type="number" id="normalVarianceValue" name="variznce" value="1" min="1">
					</div>
					
					<div id="dataPoissonDistribution" style="visibility: collapse; height: 0px">
						<p>Base:</p> <input type="number" id="poissonLambda" name="lambda" value="1" min="1">
					</div>
					
				</div>
			</div>
				<div class="col-sm-8">
					<button id="modBacklogBtn" class="btn btn-primary">SAVE</button>
				</div>
			
		</div>
<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>