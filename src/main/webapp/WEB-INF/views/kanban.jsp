<jsp:include page="header.jsp"></jsp:include>

<body>
	<div class="btn-group-vertical">
		<button class="btn btn-outline-primary" id="create-Task">Nueva Tarea</button>
		<button class="btn btn-outline-primary" id="create-Phase">Nueva Fase</button>
		<button class="btn btn-outline-primary" id="addUserB">Nuevo Usuario</button>
	</div>
	
	<!-- Kanban Body -->
	<div class="container">
		<div class="row">
			<div class="col-sm-4 ">
				Inicio
				<div id="tareas"></div>
			</div>

			<div id="fases"></div>

			<div class="col-sm-4">
				Fin
				<div></div>
			</div>
		</div>
	</div>

	<div id="userList"></div>

	<!-- Modal Form That Creates new Tasks -->
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




	<!-- Adds a New Phase -->
	<div id="PhaseForm" title="Añadir Nueva Fase">
		<form>
			<fieldset>

				<label for="nameFase">Nombre de la Fase</label> <input type="text"
					name="nameFase" class="text ui-widget-content ui-corner-all"
					id="nameFase"> <label for="maxTareas">Máximo de
					tareas</label> <input id="maxTareas" type="text" name="maxTareas"
					class="text ui-widget-content ui-corner-all"> <input
					type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>





	<!-- Modal Form to add users  -->
	<div id="useerAddDiv" title="Añadir Usuario">
		<form id="form">
			<fieldset>

				<label>Nombre:</label><br> <input id="name" type="text"
					name="firstname"> <br> <label>Especialidades:</label>
				<div>
					<input id="addSpec" type="button" value="+"><input
						id="rmvSpec" type="button" value="-">
				</div>
				<br>

				<div id="specContainer">
					<input id="spec1" type="text" name="especialidad1"><br>
				</div>
				<br> <br> <input type="submit" value="Guardar"
					tabindex="-1" style="position: absolute; top: -1000px">

			</fieldset>
		</form>
	</div>



	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>