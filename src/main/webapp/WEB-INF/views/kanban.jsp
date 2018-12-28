<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="header.jsp"></jsp:include>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Kanban</title>
<link rel="stylesheet" href="/resources/css/kanban.css">
<link rel="shortcut icon" href="#" />

</head>
<body>
<!--

____________________________________________________________________

______________________________ BOTONES  ____________________________

____________________________________________________________________
-->

<!-- Contenedor de botones principal, el cual contiene botones 'meta', no interfiren con el transcurso del programa, unicamente
	 Sirven para resetear el tablero y para motrar la informacion de como usar el propio programa -->
	<div class="botonesContainer1" id="botonesContainer1">

		<!-- Nuevo Tablero -->
		<div class="doubleButton" id="doubleButton">
			<button id="divDelete">
				<i id="deleteAll" class="fas fa-file fa-3x" data-toggle="tooltip"
					data-placement="top" title="Nuevo Tablero"></i>
			</button>
			
			<!-- Botón para mostrar información del tablero -->
			<button id="info" data-target="#generalInfo" data-toggle="modal">
				<i id="infoIcon" class="fas fa-info-circle fa-3x"
					data-toggle="tooltip" data-placement="top" title="Info"></i>
			</button>
			
		</div>

<!-- Otra tanda de botones contextuales, la mayor diferencia es que estos si que sirven durante la partida, ya que muestran en
 	 detalle los valores representados durante el proceso, sobre todo tiempos, y sus respectivos gráficos -->
		<div class="doubleButton">
	
		<!-- Genera los resultados para poder ver los tiempos, no se puede acceder hasta que no se haya detenido la ejecucion 
			 del kanban -->
			<button id="result" onclick="generarResultados()" class="resultbutt">
				<i class="fas fa-clipboard-list fa-4x" data-toggle="tooltip"
					data-placement="top" title="Mostrar Resultados"></i>
			</button>
			
		<!-- Similar al anterior, ya que usa los valores de este, pero con la pequeña diferencia de que se puede acceder en cualquier
			 momento de la ejecucion y te muestra los valores en una gráfica a tiempo real -->
			<button id="graficos" onclick="mostrarGraficas()" class="resultbutt">
				<i class="fas fa-chart-bar fa-4x" data-toggle="tooltip"
					data-placement="top" title="Mostrar Graficos"></i>
			</button>
		<!-- Este botón solo sirve para poder guardar los datos dentro de la base de datos -->
			<div id="saveResultsButton">
				<button id="saveResult" class="resultbutt" data-toggle="modal"
					data-target="#modalBlueprint">
					<i class="fas fa-save fa-4x" data-toggle="tooltip"
						data-placement="top" title="Guardar Plantilla"></i>
				</button>
			</div>



		</div>

	</div>
	<h1 class="texto">KANBAN SIM</h1>

	<!--
____________________________________________________________________

_________________________ USUARIOS  ________________________________

____________________________________________________________________
-->

	<fieldset class="teamField">

		<legend class="teamField">
			Miembros del Equipo:<span style="float: left; margin-left: 80%;"
				class="legUser"> <!-- margin-left :80% -->
				<button id="addUser">
					<i class="fas fa-user-plus fa-2x" data-toggle="modal"
						data-target="#addUsers"></i>
				</button>
			</span>

		</legend>

		<div class="usersContainer" id="usersContainer"></div>

	</fieldset>

	<p role="alert"
		style="float: left; margin-left: 25%; font-size: 140%; margin-top: 1%; position: absolute;"
		id="saturacion"></p>
	<p role="alert"
		style="float: right; margin-right: 25%; font-size: 140%; margin-top: 1%;"
		id="saturacion2"></p>

	<!--Temporizador y Cambiar Distribucion -->
	<p data-toggle="modal" data-target="#modalChrono" id="chronoViewer">00:00</p>

	<div class="botonesContainer">

		<!--  Botón Play/Pause -->

		<div id="divReset">
			<i id="reset" class="fas fa-redo fa-3x"></i>
		</div>
		<div class="playpause">
			<input type="checkbox" value="None" id="playpause" name="check" /> <label
				for="playpause" tabindex=1></label>
		</div>

	</div>

	<!-- Botón Add Tasks, SOLO MANUAL -->
	<button id="addTask" data-toggle="tooltip" data-placement="top"
		title="Añadir Tareas">
		<i class="fas fa-plus fa-3x"></i>
	</button>
	<div id="mostrarResultadosDiv" class="mostrarResultadosDiv"></div>

	<!--
____________________________________________________________________

_______________________ GRAFICOS ____________________________

____________________________________________________________________
-->
	<div id="mostrarGraficosDiv" class="mostrarGraficosDiv">
		<div class="chart-container chartTask" id="taskChart">
			<h2>Gráfico de Tareas</h2>
			<canvas id="myChartTask"></canvas>

			<div id="js-legend" class="chart-legend"></div>

			<br>
			<h2>Gráfico de Fases</h2>

			<div class="chartWrapper">
				<div class="chartAreaWrapper">
					<div class="chartAreaWrapper2">
						<canvas id="myChartPhase"></canvas>
					</div>
				</div>

				<canvas id="myChartAxis" height="300" width="0"></canvas>
			</div>

			<h2>Gráfico de Usuarios</h2>
			<canvas id="myChart"></canvas>
		</div>
	</div>

	<div class="contenedor" id="contenedor">


		<!--
____________________________________________________________________

_______________________ INICIO TABLERO  ____________________________

____________________________________________________________________
-->

		<div class="principio">

			<div class="tituloInit">Backlog</div>
			<div class="tituloInit barra"></div>
			<div class="contenedorTareas">

				<script>
					var listTareas = new Array();
					var listPhases = new Array();
					var listUsers = new Array();
					var distribution = new Object();
					var listResultados = new Array();
				</script>

			</div>

		</div>

		<div id="faseDiv" class="fase"></div>


		<div class="fin">

			<div class="tituloEnd">Fin</div>
			<div class="tituloEnd barra"></div>
			<div class="contenedorFinal"></div>

		</div>
	</div>



	<!--

____________________________________________________________________

__________________________ MODAL FORMS  ____________________________

____________________________________________________________________
-->

	<!-- Modal Añadir Fases-->
	<div class="modal fade" id="modalAddFases" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Añadir Fase</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					Nombre Fase: <input type="text" id="addName"
						placeholder="Nombre Fase" required> WIP: <input
						type="text" id="addWip" value="1" required> Tiempo Mínimo:
					<input type="text" id="addMinTime" value="1" required>
					Tiempo Máximo: <input type="text" id="addMaxTime" value="1"
						required> Color:
					<div class="col-10">
						<input class="form-control" type="color" id="color-input"
							list="presetColors" value="#4ce600">

						<datalist id="presetColors">
							<option>#4ce600</option>
							<option>#66cc00</option>
							<option>#00ffbf</option>
							<option>#009999</option>
							<option>#005ce6</option>
							<option>#563d7c</option>
							<option>#da70d6</option>
							<option>#cc00cc</option>
							<option>#b30047</option>
							<option>#e60000</option>
							<option>#cc8800</option>
							<option>#cccc00</option>
							<option>#E5FB22</option>
							<option>#BEFF00</option>
							<option>#ace600</option>
						</datalist>
					</div>
					<br>
					<button id="addPhase" class="btn btn-secondary">Añadir</button>

				</div>
				<div id="addFasesWarning"></div>
				<div id="addFasesWarning2"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>

	<!-- Modal Modificar Fases-->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Modificar Fase</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					Nombre Fase: <input type="text" id="modName" disabled> WIP:
					<input type="number" id="modWip"> Tiempo Mínimo: <input
						type="number" id="modMinTime"> Tiempo Máximo: <input
						type="number" id="modMaxTime"> Color:
					<div class="col-10">
						<input class="form-control" type="color" id="color-input2"
							list="presetColors2">

						<datalist id="presetColors2">
							<option>#4ce600</option>
							<option>#66cc00</option>
							<option>#00ffbf</option>
							<option>#009999</option>
							<option>#005ce6</option>
							<option>#563d7c</option>
							<option>#da70d6</option>
							<option>#cc00cc</option>
							<option>#b30047</option>
							<option>#e60000</option>
							<option>#cc8800</option>
							<option>#cccc00</option>
							<option>#E5FB22</option>
							<option>#BEFF00</option>
							<option>#ace600</option>
						</datalist>
					</div>
					<br>
					<button id="modPhase" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>
				</div>
				<div id="modPhaseWarning"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>



	<!-- Modal Modificar Usuarios-->
	<div class="modal fade" id="myModal2" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Modificar Miembro</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">

					Nombre Usuario: <input type="text" id="modNameUser">
					<div>Fases:</div>
					<div id="modFasesUser"></div>
					<br> Rendimiento por fase:
					<div id="modSkillsUser"></div>
					<br>
					<button id="modUsuario" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>

				</div>
				<div id="modUserWarning"></div>
				<div class="modal-footer">
					<button id="rmvUsuario" class="btn btn-danger" data-dismiss="modal">Eliminar
						Miembro</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal Añadir Usuarios-->
	<div class="modal fade" id="addUsers" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Añadir Miembro</h4>

					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Nombre Usuario: <input type="text" id="addNameUser"
						placeholder="Nombre">
					<div>Fases:</div>
					<div id="addFasesUser"></div>
					<br> Rendimiento por fase:
					<div id="addSkillsUser"></div>
					<br>
					<button id="addUsuario" class="btn btn-secondary"
						data-dismiss="modal">Añadir</button>

				</div>
				<div id="addUserWarning"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Modificar Temporizqdor-->
	<div class="modal fade" id="modalChrono" role="dialog">

		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Temporizador</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Tiempo: <input type="number" id="modChronoTime" min=0 value=0>

					<div>
						<input type="radio" name="chronoTimeType" value="sec" checked>Segundos
						<input type="radio" name="chronoTimeType" value="min">Minutos
					</div>
					<button id="modChrono" class="btn btn-secondary"
						data-dismiss="modal">Modificar</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>

	</div>

	<!-- Modal Distribución -->
	<div class="modal fade" id="modalDistribution" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Cambiar Distribución</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">

					<div class="card-body">
						<p>Entrada de tareas</p>
						<div>
							<input type="radio" name="taskInputMode"
								class="distributionRadio" value="manual" checked /> Manual <input
								type="radio" name="taskInputMode" class="distributionRadio"
								value="constant" /> Constante
						</div>

						<p>Distribución</p>
						<div>
							<input type="radio" name="distributionType"
								class="distributionRadio" value="normal" disabled>
							Normal <input type="radio" name="distributionType"
								class="distributionRadio" value="poisson" disabled>
							Poisson <input type="radio" name="distributionType"
								class="distributionRadio" value="weight" disabled> Con
							peso
						</div>


						<div id="distributionData">
							<p id="paramTitle" style="visibility: collapse; height: 0px">Parametros:</p>

							<div id="dataNormalDistribution"
								style="visibility: collapse; height: 0px">
								<p class="backloglabel">Base:</p>
								<input type="number" class="backloglabelInput"
									id="normalBaseValue" name="base" value="1" min="1"><br>
								<p class="backloglabel">Varianza:</p>
								<input type="number" class="backloglabelInput"
									id="normalVarianceValue" name="variznce" value="1" min="1">
							</div>

							<div id="dataPoissonDistribution"
								style="visibility: collapse; height: 0px">
								<p class="backloglabel">Base:</p>
								<input type="number" class="backloglabelInput"
									id="poissonLambda" name="lambda" value="1" min="1">
							</div>

							<div id="dataWeightDistribution"
								style="visibility: collapse; height: 0px">
								<p class="backloglabel">S:</p>
								<div class="backloglabelInput size" id="S">
									<div id="custom-handle0" class="ui-slider-handle"></div>
									<div class="sizeValue">0</div>
								</div>
								<p class="backloglabel">M:</p>
								<div class="backloglabelInput size" id="M">
									<div id="custom-handle1" class="ui-slider-handle"></div>
									<div class="sizeValue">0</div>
								</div>
								<p class="backloglabel">L:</p>
								<div class="backloglabelInput size" id="L">
									<div id="custom-handle2" class="ui-slider-handle"></div>
									<div class="sizeValue">0</div>
								</div>
								<p class="backloglabel">XL:</p>
								<div class="backloglabelInput size" id="XL">
									<div id="custom-handle3" class="ui-slider-handle"></div>
									<div class="sizeValue">0</div>
								</div>
							</div>

						</div>
					</div>
					<div class="col-sm-8">
						<button id="modBacklogBtn" class="btn btn-primary"
							data-dismiss="modal">SAVE</button>

					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<!--
____________________________________________________________________

__________________________ MODAL PLANTILLA  ________________________

____________________________________________________________________
-->

	<!-- Modal Plantillas-->
	<div class="modal fade" id="modalBlueprint" role="dialog">

		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Añadir/Modificar Plantilla</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Nombre Plantilla: <input type="text" id="inputBlueprintName"
						placeholder="Nombre Plantilla"> <br>
					<button id="addBlueprint" class="btn btn-secondary"
						data-dismiss="modal">Añadir</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>

	</div>

	<!-- Modal Seleccionar Plantillas-->
	<div class="modal fade" id="modalSelectBlueprint" role="dialog">

		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Añadir/Modificar Plantilla</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
					Nombre Plantilla: <select id="selectBlueprintName"></select>

					<button id="selectBlueprint" class="btn btn-secondary"
						data-dismiss="modal">Selecionar</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>

	</div>


	<!--
____________________________________________________________________

__________________________ MODAL INFO  ____________________________

____________________________________________________________________
-->

	<!-- Modal Info Tareas -->
	<div class="modal fade" id="modalTaskInfo" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Información de tarea</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">

					<p id="modalTaskName">Nombre:</p>
					<p class="alert alert-info" id="modalTaskNameValue"></p>
					<p id="modalTaskAssignedTimes">Tiempo asignado por fase:</p>
					<p class="alert alert-info" id="modalTaskTimeWorkedValue"></p>
					<p id="modalTaskRealTime">Tiempo real por fases:</p>
					<p class="alert alert-info" id="modalTaskRealTimeValue"></p>
					<p id="modalTaskLTCT">LT y CT estimado:</p>
					<p class="alert alert-info" id="modalTaskLTCTValue"></p>
					<p id="modalTaskWorking">Miembros Trabajando:</p>
					<p class="alert alert-info" id="modalTaskWorkingValue"></p>
					<p id="modalTaskWorked">Miembros que han Trabajado:</p>
					<p class="alert alert-info" id="modalTaskWorkedValue"></p>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- Modal General Info -->
	<div class="modal fade" id="generalInfo" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Información</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<div class="modal-body">
				
				<h2>General</h2>
				<dl>
				<dt><h4>Fases</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Miembros de Equipo</h4></dt>
				<dd>
					<strong>Añadir Miembros:</strong> Para añadir miembros haga click en el icono  <i class="fas fa-user-plus fa-1x" data-toggle="tooltip"	data-placement="right" title="Añadir Miembro"></i>. 
					<br>Podrá asignarlo a una fase creada y determinar su rendimiento en esa fase.
				</dd>
				<dd>
					<strong>Modificar Miembros:</strong> Para añadir miembros haga click en el Miembro . Podrá cambiar su asignación y rendimiento.
				</dd>
				<dd>
					<strong>Eliminar Miembros:</strong> Para eliminar miembros haga click en el Miembro y click en "Eliminar Miembro".
				</dd>
				<dt><h4>Distribución</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Tarea</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Cronometro</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Fases</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				</dl>
				<h2>Resultados y gráficas</h2>
				<dl>
				<dt><h4>Resultados</h4></dt>
				<dd>
					<strong>Mostrar Resultados</strong> Para visualizar los resultados haga click en el icono 
					 <i class="fas fa-clipboard-list fa-1x" data-toggle="tooltip"	data-placement="right" title="Mostrar Resultados"></i>
				</dd>
				<dt><h4>Gráficas</h4></dt>
				<dd>
					<strong>Mostrar Gráficas:</strong>Para visualizar los resultados haga click en el icono <i class="fas fa-chart-bar fa-1x" data-toggle="tooltip" data-placement="right" title="Mostrar Graficos"></i>.
					<br>Podrá visualizar las gráficas incluso mientras la partida este en curso.
				</dd>
				</dl>
				<h2>Plantillas</h2>
				<dl>
				<dt><h4>Guardar</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Cargar</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				<dt><h4>Modificar</h4></dt>
				<dd>
					Suspendisse potenti. 
				</dd>
				</dl>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	
	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>