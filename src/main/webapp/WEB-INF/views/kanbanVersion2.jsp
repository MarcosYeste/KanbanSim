<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Kanban</title>

</head>
<body>


	<%-- <table class="table table-bordered">
		<thead>
			<tr>
				<th scope="col">Inicio</th>
				<c:forEach items="${phases}" var="fase">
					<th scope="col" class="mw=10"><c:out value="${fase.name}"></c:out></th>
				</c:forEach>
				<th scope="col">Fin</th>
			</tr>
		</thead>
		<tbody>

			<c:forEach items="${task}" var="task">
				<tr>
					<td scope="col" class="text-center"><c:out value="${task.name}"></c:out></td>
				</tr>
			</c:forEach>



		</tbody>
	</table>
	<br>
	<br>

	<c:forEach items="${user}" var="user">

		<p>
			<strong><c:out value="${user.name}"></c:out></strong>
		</p>

	</c:forEach> --%>
	<script>
		var listTareas = new Array();
	</script>
	<div id="father">
		<c:forEach items="${task}" var="task">
			<div id="${task.name}">
				<c:out value="${task.name}"></c:out>
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
		<div style="border: 1px solid; padding: 20px" id="vacio"></div>
		<div style="border: 1px solid red; padding: 20px" id="vacio2"></div>
	</div>

	<button id="play">Play</button>


	<!--  <div class="contenedor">
	
		<div class="principio"><h3>Etapa de inicio</h3><c:forEach items="${task}" var="task">
           
              <div class="faseName">
             <p><strong><c:out value="${task.name}"></c:out></strong></p>
               </div>

            
        </c:forEach></div>
        
		<div class="fase"><c:forEach items="${phases}" var="fase">
           
              <div class="faseName">
             <p><strong><c:out value="${fase.name}"></c:out></strong></p>
               </div>

            
        </c:forEach></div>
		<div class="fin"><h3>Etapa final</h3></div>
	</div><br><br>-->



	<jsp:include page="footer.jsp"></jsp:include>

	<script type="text/javascript">
	
		document.getElementById("play").addEventListener("click", function() {
	
			for (var i = 0; i < listTareas.length; i++) {
	
				var text = listTareas[i].name.getAttribute("id");
	
				var el = document.getElementById(text);
	
				el.parentElement.removeChild(el);
	
				document.getElementById("vacio").appendChild(el);
	
				setTimeout(function() {
					el = document.getElementById("vacio");
	
					el.parentElement.removeChild(el);
	
					document.getElementById("vacio2").appendChild(el);
				}, ((listTareas[i].duration) * 1000));
			}
	
		}, false);
	</script>

</body>
</html>