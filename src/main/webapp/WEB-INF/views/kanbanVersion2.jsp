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
				<c:forEach items="${task}" var="task">
					<div class="tareas">
						<p>
							<c:out value="${task.name}"></c:out>
						</p>
						<p>
							<c:out value="${task.duration}"></c:out>
						</p>
					</div>

					<c:set value="${task.name}" var="taskName" />
					<c:set value="${task.duration}" var="taskDuration" />

					<script>
					
						var tareas = new Object();
						tareas.name = <c:out value="${taskName}"></c:out>;
						tareas.duration = <c:out value="${taskDuration}"></c:out>;
						listTareas.push(tareas)
					</script>

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

	<button id="play">Play</button>


	<!--  Button Play/Pause -->
	<div class="playpause">
		<input type="checkbox" value="None" id="playpause" name="check" /> <label
			for="playpause" tabindex=1></label>
	</div>




	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
		</p>

	</c:forEach>


	<jsp:include page="footer.jsp"></jsp:include>
	<!--  Script que nos permitira mover las tareas -->
	<script type="text/javascript">
	
	
		var target = document.getElementsByClassName("faseName")[0];
		var elements = document.getElementsByClassName("tareas");
		var button = document.getElementById("play");
	
		// Guarda las coordenadas de el objetivo (Target)
		var xT = target.offsetLeft;
		var yT = target.offsetTop;
	
	
		button.addEventListener('click', function() {
	
			for (var i = 0; i < elements.length; i++) {
	
				// Almacena las cordenadas del elemnto
				var xE = elements[i].offsetLeft;
				var yE = elements[i].offsetTop;
	
				// centra el elemento con sus coordenadas
				elements[i].style.left = xE + 'px';
				elements[i].style.top = yE + 'px';
	
				// Cambia la posicion del elemnto a la de el objetivo
				elements[i].style.left = xT + 'px';
				elements[i].style.top = yT + 'px';
			}
		});
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script>
		var phases = $(".faseName");
		var users = '${user}';
		console.log(users[0].name);
		
	</script>
</body>
</html>