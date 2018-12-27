<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="header.jsp"></jsp:include>
<meta charset="ISO-8859-1">
<title>Kanban Simulator</title>

<link rel="stylesheet" href="/resources/css/kanban.css">
</head>
<body>




	<h1 class="textoInicio">KANBAN SIMULATOR</h1>
<form action="/plantilla"  method="POST">
 <div class="indexForm">
	<div class="form-group">
	<label for="plant"> Elige una opción para generar Kanban</label>
	<select id="plant"  class="form-control col-md-4">
		<option value ="new">Nuevo Kanban</option>
		<!-- <script> getBlueprints();
		
		for (var i = 0; i < nameBlueprintArray[0].length; i++) {
			document.write("<option value = '"+nameBlueprintArray[1][i]+"' > "+nameBlueprintArray[0][i]+" </option>");
			
		}
		
		</script>
		 -->
		
	</select>
	
	</div>
	<button type="submit" class="btn btn-primary">Generar</button>
</div>
</form>

<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>