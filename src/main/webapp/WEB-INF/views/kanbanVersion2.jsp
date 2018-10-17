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

	<h1 class="texto">KANBAN SIM</h1>

	<div class="contenedor">

		<div class="principio">
			<div class="titulo">Etapa de inicio</div>
			<div class="titulo barra"></div>
			<div class="contenedorTareas">
				<script>
					var listTareas = new Array();
				</script>
				
					<div id="101" class="tareas">
						<p>
							Tarea 1
						</p>
						<p id="duration" class="duration">
							1
						</p>
					</div>
					<div id="102" class="tareas">
						<p>
							Tarea 2
						</p>
						<p id="duration" class="duration">
							2
						</p>
					</div>
					<div id="103" class="tareas">
						<p>
							Tarea 3
						</p>
						<p id="104" class="duration">
							3
						</p>
					</div>
					<div id="104" class="tareas">
						<p>
							Tarea 4
						</p>
						<p id="duration" class="duration">
							4
						</p>
					</div>
					<div id="105" class="tareas">
						<p>
							Tarea 5
						</p>
						<p id="duration" class="duration">
							6
						</p>
					</div>

				
			</div>

		</div>

		<div id="faseDiv" class="fase">


			<c:forEach items="${phases}" var="fase">
				<div class="faseName">

					<div class="titulo">
						<c:out value="${fase.name}"></c:out>
					</div>

					<div class="subfase">
						<div id="doing" class="doing">
							<p class="subSubfase">Doing</p>
						</div>
						<div id="done" class="done">
							<p class="subSubfase">Done</p>
						</div>
					</div>
				</div>
			</c:forEach>
		</div>


		<div class="fin">
			<div class="titulo">Etapa final</div>
			<div class="titulo barra"></div>
			<div class="final"></div>
		</div>
	</div>

	<button id="play" onclick="play()">Play</button>


	<!--  Button Play/Pause -->
	<div class="playpause">
		<input type="checkbox" value="None" id="playpause" name="check" /> <label
			for="playpause" tabindex=1></label>
	</div>

	<script>
		var userSpecs = [];
		var userNames = [];
	</script>
	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
			<c:set value="${user.name}" var="useName" />
			<c:set value="${user.rawSpecs}" var="rawSpecs" />
		</p>

		<script>
		userNames.push('<c:out value="${useName}"></c:out>');
		userSpecs.push('<c:out value="${rawSpecs}"></c:out>');
		</script>
	</c:forEach>
	<script>

	
	 function play() {
	} 
	 
	</script>




	<script>
	
		var phases = $(".faseName");
		console.log(userNames);
		console.log(userSpecs);
				
	</script>
	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>