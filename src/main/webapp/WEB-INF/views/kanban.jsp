<jsp:include page="header.jsp"></jsp:include>

<body>

	<!-- Kanban Body -->
	<div class="container">
		<div class="col-sm-4 div-head">
			Inicio
			<div id="tareas"></div>
		</div>

		<div id="fases"></div>

		<div class="col-sm-4 div-head">
			Fin
			<div></div>
		</div>
	</div>


	<!-- Modal Form That Creates new Tasks -->
	<div id="dialog-form" title="A�adir Nueva Tarea">

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

	<!-- Adds a New Phase -->
	<div id="PhaseForm" title="A�adir Nueva Fase">
		<form>
			<fieldset>

				<label for="nameFase">Nombre de la Fase</label> <input type="text"
					name="nameFase" class="text ui-widget-content ui-corner-all"
					id="nameFase"> <label for="maxTareas">M�ximo de
					tareas</label> <input id="maxTareas" type="text" name="maxTareas"
					class="text ui-widget-content ui-corner-all"> <input
					type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>



	<button id="create-Phase">Nueva Fase</button>

	<!-- Modal Form to add users  -->
	<div id="useerAddDiv" title="A�adir Usuario">
		<form id="form">
			<fieldset>

				<label>Nombre:</label><br> <input id="name" type="text"
					name="firstname"> <br> <label>Especialidades:</label>
				<div>
					<input id="addSpec" type="button" value="+"> <input
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
	<button id="addUserB">Nuevo Usuario</button>

	<!-- Lista donde se mostararn todos los usuarios  -->
	<div id="userList"></div>
	
	
	<script src="/resources/js/userFormSpecs.js"></script>
	<script src="/resources/js/form3.js"></script>
	<script src="/resources/js/form.js"></script>
</body>
</html>