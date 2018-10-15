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
					<div id="tareas" class="tareas">
						<p>
							<c:out value="${task.name}"></c:out>
						</p>
						<p id="duration" class="duration">
							<c:out value="${task.duration}"></c:out>
						</p>
					</div>

					<c:set value="${task.name}" var="taskName" />
					<c:set value="${task.duration}" var="taskDuration" />

					<!-- <script>
					
						var tareas = new Object();
						tareas.name = <c:out value="${taskName}"></c:out>;
						tareas.duration = <c:out value="${taskDuration}"></c:out>;
						listTareas.push(tareas)
					</script>  -->

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
		
		var divsTareas = document.getElementsByClassName("tareas");
		var duration = document.getElementsByClassName("duration");
		var subfases = document.getElementsByClassName("subfase");
		var fases = document.getElementsByClassName("faseName");
		var y = 0;
		var myInterval;
		
		console.log("Length " + subfases.length);
		while (y != subfases.length) { // COLUMNAS

			var doneLength = document.getElementsByClassName("done")[y].childElementCount - 1;
			var doingLength = document.getElementsByClassName("doing")[y].childElementCount - 1;

			//if (doneLength == divsTareas.length ) { // MIENTRAS EL DONE NO ESTE LLENO
				//y++;
				//console.log("enter");
			//}
			console.log("Index: " + y);
			
			var doing = subfases[y].firstElementChild;
			var done = subfases[y].lastElementChild;




			for (var k = divsTareas.length - 1; k >= 0; k--) { // TAREAS
			
				if(doingLength != divsTareas.length ){  // MIENTRAS EL DOING NO ESTE LLENO
					
					var duracionTiempo = divsTareas[k].lastElementChild;
					
					doing.appendChild(divsTareas[k]);
	
					var durationTime = parseFloat(duracionTiempo.textContent);
					console.log("Pre time operation: " + durationTime);
	 				durationTime *= 100000;	
					console.log("Post time operation: " + durationTime);
					var tareaDoing = doing.lastElementChild;
					var mto =setTimeout(function(){done.appendChild(tareaDoing);
											console.log("appended");
											clearTimeout(mto);}, durationTime);
					//setTaskIntime(durationTime, done, tareaDoing);
					
				}

		}
			y++;
			console.log("end");
	}


}

	
	
	function setTaskIntime(durationTime, done, tareaDoing) {
		console.log("In method: " + durationTime);
		setTimeout(moverDone(done,tareaDoing), durationTime);
	
	}
	
	function moverDone(done,tareaDoing) {
			done.appendChild(tareaDoing); 
			play();
		
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