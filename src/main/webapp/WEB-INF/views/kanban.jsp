<jsp:include page="header.jsp"></jsp:include>


<body>
	<div class="container">
		<div class="col-sm-4 border-right">
			Inicio
			<div id="tareas"></div>
		</div>
		<div id="fasesForm"></div>
		<div class="col-sm-4">
			Fin
			<div></div>
		</div>
	</div>

	<div id="dialog-form" title="Añadir Nueva Tarea">

		<form>
			<fieldset>
				<label for="tarea">Nombre Tarea</label> <input type="text"
					name="tarea" id="tarea"
					class="text ui-widget-content ui-corner-all">

				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>


	<button id="create-Task">Nueva Tarea</button>

	<button onclick="addFase()">Nueva Fase</button>


	<div id="useerAddDiv" title="Añadir Usuario">
		<form id="form">
			<fieldset>
				<label>Nombre:</label><br> <input id="name" type="text"
					name="firstname"> <br> <label>Especialidades:</label><input
					id="addSpec" type="button" value="+"><input id="rmvSpec"
					type="button" value="-"><br>
				<div id="specContainer">
					<input id="spec1" type="text" name="especialidad1"><br>
				</div>
				<br>
				<br> <input type="submit" value="Guardar" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>
	<button id="addUserB">Add User</button>
	<script src="/resources/js/userFormSpecs.js"></script>
	<script src="/resources/js/form.js"></script>
</body>
</html>