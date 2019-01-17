<!DOCTYPE html>
<html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="header.jsp"></jsp:include>
<head>
<link rel="stylesheet" href="/resources/css/kanban.css">

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

		<span id="arrow"><i class="fas fa-caret-right" style="margin: 0 5px"></i></span>

		<div class="doubleButton">
			<!-- Nuevo Tablero -->

			<div id="doubleButton">
				<button id="divDelete">
					<i id="deleteAll" class="fas fa-file " data-toggle="tooltip"
						data-placement="top" title="Nuevo Tablero"></i>
				</button>

				<!-- Botón para mostrar información del tablero -->
				<button id="info" data-target="#generalInfo" data-toggle="modal">
					<i id="infoIcon" class="fas fa-info-circle "
						data-toggle="tooltip" data-placement="left" title="Info"></i>
				</button>
			</div>

			<!-- Otra tanda de botones contextuales, la mayor diferencia es que estos si que sirven durante la partida, ya que muestran en
 	 detalle los valores representados durante el proceso, sobre todo tiempos, y sus respectivos gráficos -->

			<!-- Genera los resultados para poder ver los tiempos, no se puede acceder hasta que no se haya detenido la ejecucion 
			 del kanban -->
			<button id="result" onclick="generarResultados()" class="resultbutt">
				<i class="fas fa-clipboard-list " data-toggle="tooltip"
					data-placement="top" title="Mostrar Resultados"></i>
			</button>

			<!-- Similar al anterior, ya que usa los valores de este, pero con la pequeña diferencia de que se puede acceder en cualquier
			 momento de la ejecucion y te muestra los valores en una gráfica a tiempo real -->
			<button id="graficos" onclick="mostrarGraficas()" class="resultbutt">
				<i class="fas fa-chart-bar " data-toggle="tooltip"
					data-placement="top" title="Mostrar Graficos"></i>
			</button>
			<!-- Este botón solo sirve para poder guardar los datos dentro de la base de datos -->
			<button id="saveResult" class="resultbutt" data-toggle="modal"
				data-target="#modalBlueprint">
				<i class="fas fa-save " data-toggle="tooltip"
					data-placement="top" title="Guardar Plantilla"></i>
			</button>
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


<div class="headerTable">
	<div class="crono">
		<p data-toggle="modal" data-target="#modalChrono" id="chronoViewer"
			data-placement="right" title="Chronometer">00:00</p>
	</div>
	<div>
	<p role="alert" id="saturacion"></p>
	</div>
	<div id="botonesPlay" class="botonesContainer">

		<!--  Botón Play/Pause -->
		<div class="playAndReset">
		<div id="divReset">
			<i id="reset" class="fas fa-redo "></i>
		</div>
		<div class="playpause">
			<input type="checkbox" value="None" id="playpause" name="check" /> 
			<label for="playpause" tabindex=1><i id="playButton" class="fa fa-play"></i></label>
		</div>
		</div>
		<div class="rewindAndForward">
		<button id="backward" disabled="disabled">
			<i class="fas fa-backward " onclick="speedKanban('rewind')" ></i>

		</button>
		<span id="multiplicador">x1</span>
		<button id="forward">
			<i class="fas fa-forward " onclick="speedKanban('forward')"></i>
		</button>

		</div>
	</div>
	<div>
	<p role="alert" id="saturacion2"></p>
	</div>
	<div class="clock">
		<p data-toggle="modal" id="clock" data-placement="right" title="Clock">00:00</p>
	</div>
</div>

<!-- 


	<p role="alert" id="saturacion"></p>
	<p role="alert" id="saturacion2"></p>

	Temporizador y Cambiar Distribucion
	<div class="crono">
		<p data-toggle="modal" data-target="#modalChrono" id="chronoViewer"
			data-placement="right" title="Chronometer">00:00</p>
	</div>
	<div class="clock">
		<p data-toggle="modal" id="clock" data-placement="right" title="Clock">00:00</p>
	</div>


	<div id="botonesPlay" class="botonesContainer">

		 Botón Play/Pause
		<div class="playAndReset">
		<div id="divReset">
			<i id="reset" class="fas fa-redo "></i>
		</div>
		<div class="playpause">
			<input type="checkbox" value="None" id="playpause" name="check" /> 
			<label for="playpause" tabindex=1><i id="playButton" class="fa fa-play"></i></label>
		</div>
		</div>
		<div class="rewindAndForward">
		<button id="backward" disabled="disabled">
			<i class="fas fa-backward " onclick="speedKanban('rewind')" ></i>

		</button>
		<span id="multiplicador">x1</span>
		<button id="forward">
			<i class="fas fa-forward " onclick="speedKanban('forward')"></i>
		</button>

		</div>
	</div>
 -->
	<!-- Botón Add Tasks, SOLO MANUAL -->
	<button id="addTask" data-toggle="tooltip" data-placement="top"
		title="Añadir Tareas">
		<i class="fas fa-plus "></i>
	</button>
	<div id="mostrarResultadosDiv" class="mostrarResultadosDiv"></div>

	<!--
____________________________________________________________________

_______________________ GRAFICOS ___________________________________

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



	<!--
____________________________________________________________________

_______________________ INICIO TABLERO  ____________________________

____________________________________________________________________
-->
	<div class="contenedor" id="contenedor">
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
						<input type="radio" name="chronoTimeType" value="sec"
							id="segundos" checked> <label for="segundos"><span></span>Segundos</label>
						<input type="radio" name="chronoTimeType" value="min" id="minutos">
						<label for="minutos"><span></span>Minutos</label>
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
								class="distributionRadio" value="manual" id="manual" checked />
							<label for="manual"><span></span> Manual </label> <input
								type="radio" name="taskInputMode" class="distributionRadio"
								value="constant" id="constante" /> <label for="constante"><span></span>
								Constante </label>

						</div>

						<p>Distribución</p>
						<div>
							<input type="radio" name="distributionType"
								class="distributionRadio" value="normal" id="normal" disabled>
							<label for="normal"><span></span> Normal </label> <input
								type="radio" name="distributionType" class="distributionRadio"
								value="poisson" id="poisson" disabled> <label
								for="poisson"><span></span> Poisson </label> <input type="radio"
								name="distributionType" class="distributionRadio" value="weight"
								id="peso" disabled> <label for="peso"><span></span>
								Con peso</label>
						</div>

						<div id="distributionData">
							<p id="paramTitle" style="visibility: collapse; height: 0px">Parametros:</p>

							<div id="dataNormalDistribution"
								style="visibility: collapse; height: 0px">
								<p class="backloglabel">Base:</p>
								<input type="number" class="backloglabelInput"
									id="normalBaseValue" name="base" value="1" min="1"
									onClick="this.select()"><br>
								<p class="backloglabel">Varianza:</p>
								<input type="number" class="backloglabelInput"
									id="normalVarianceValue" name="variznce" value="1" min="1"
									onClick="this.select()">
							</div>

							<div id="dataPoissonDistribution"
								style="visibility: collapse; height: 0px">
								<p class="backloglabel">Base:</p>
								<input type="number" class="backloglabelInput"
									id="poissonLambda" name="lambda" value="1" min="1"
									onClick="this.select()">
							</div>

							<div id="dataWeightDistribution"
								style="visibility: collapse; height: 0px">
								<p>Rango de tiempo de entrada: </p>
								<input type="number" id="weightTimeLapse" value="1" min="1" onClick="this.select()"><br>
								<p>Rango de probabilidad de aparición: </p>
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
							data-dismiss="modal">Guardar</button>

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
					<hr>
					<dl>
						<dt>
							<span class="h4">Iniciar</span>
						</dt>
						<dd>Para poder iniciar el kanban hace falta que tenga fases,
							usuarios y tareas. Para empezar la ejecución solo hace falta
							darle al botón de play y para pausar en cualquier momento haz
							clic en el botón de pausa, También puedes resetear la ejecución
							dandole al botón de replay.</dd>
						<hr>
						<dt>
							<span class="h4">Fases</span>
						</dt>
						<dd>
							<strong>Añadir Fases:</strong> Para añadir fases haga click en el
							botón de 'Nueva Fase' <br>Deberá Asignar un nombre, un WIP,
							un tiempo máximo y minimo y un color que lo representará
							visualmente.
						</dd>
						<dd>
							<strong>Modificar Fases:</strong> Para modificar fases haga click
							en el el titulo de la fase. Podrá cambiar todos sus elementos
							excepto su nombre.
						</dd>
						<dd>
							<strong>Ordenar Fases:</strong> Para ordenar las fases
							simplemente tiene que agarrar con el cursor la fase y arrastrarla
							hasta la posicion que usted desee.
						</dd>
						<hr>
						<dt>
							<span class="h4">Miembros de Equipo</span>
						</dt>
						<br>
						<dd>
							<strong>Añadir Miembros:</strong> Para añadir miembros haga click
							en el icono <i class="fas fa-user-plus fa-1x"
								data-toggle="tooltip" data-placement="right"
								title="Añadir Miembro"></i>. <br>Podrá asignarlo a una fase
							creada y determinar su rendimiento en esa fase.
						</dd>
						<dd>
							<strong>Modificar Miembros:</strong> Para modificar miembros haga
							click en el Miembro . Podrá cambiar su asignación y rendimiento.
						</dd>
						<dd>
							<strong>Eliminar Miembros:</strong> Para eliminar miembros haga
							click en el Miembro y click en "Eliminar Miembro".
						</dd>
						<hr>
						<dt>
							<span class="h4">Distribución</span>
						</dt>
						<br>
						<dd>
							<dl>
								<dt>Distribución Manual:</dt>
								<dd>
									La entrada de tareas se efectua mediante el botón <i
										class="fas fa-plus fa-1x"></i> (el sistema siempre detectará
									que existe sobre carga ya que la entrada de tareas es 0).
								</dd>
								<dt>Distribución Constante:</dt>
								<dd>
									La entrada de tareas se efectua de manera automatica y
									constante, según el tipo de constante se podrán configurar
									diversos parametros de entrada.<br>
									<dl>
										<dt>Normal:</dt>
										<dd>Tiene dos parametros, la base que es la media general
											de tiempo que tardaran las tareas en entrar y la varianza que
											es la distancia por encima y por debajo que se puede alejar
											este tiempo del valor base.</dd>
										<dt>Poisson:</dt>
										<dd>Tiene un parametro, lambda que supone el valor base
											de entrada de tareas</dd>
										<dt>Con Peso:</dt>
										<dd>Tiene 4 valores a configurar cada cual representa un
											tamaño de tareas, de esta forma se especifica la probabilidad
											que tienen de aparecer tareas de ese tamaño. El tamaño se
											traduce a tiempo que se les asigna a las tareas, cuando mayor
											tamaño mayor sera el tiempo que se le asigne (relativo a la
											fase en la que se encuentre la tarea.)</dd>
									</dl>
								</dd>
							</dl>
						</dd>
						<hr>
						<dt>
							<span class="h4">Tarea</span>
						</dt>
						<br>
						<dd>
							<dl>
								<dt>Añadir</dt>
								<dd>
									Para poder añadir tareas es tán sencillo como estar en
									distribución manual y darle al botón <i
										class="fas fa-plus fa-1x"></i><br> Si por el contrario
									estas en una distribución contante, estas tareas se añadirán
									automaticamente.
								</dd>
								<dt>Información</dt>
								<dd>Cada tarea tiene su propia información, para poder
									verla solo necesitas darle clic encima de la tarea qe quieras y
									ya está.</dd>
							</dl>
						</dd>
						<hr>
						<dt>
							<span class="h4">Cronometro</span>
						</dt>
						<br>
						<dd>
							Para Iniciar el cronometro dale clic encima de los numeros <b>00:00</b>,
							saldra una ventana en la que se permitirá indicar el tiempo tanto
							en minutos como en segundos, una vez guardado dele iniciar el
							Kanban y una vez pasado el tiempo la ejecución se parará
							automaticamente.
						</dd>
						<hr>
						<dt>
							<span class="h4">Nuevo Tablero</span>
						</dt>
						<br>
						<dd>
							Si te has cansado ya del tablero que tienes simplemente tienes
							que darle clic al icono <i class="fas fa-file fa-1x"></i>. Ten en
							cuenta que esto borrará todo, Equipo y fases.
						</dd>
					</dl>
					<hr>
					<h2>Resultados y gráficas</h2>
					<hr>
					<dl>
						<dd>
							<strong>Mostrar Resultados</strong> Para visualizar los
							resultados haga click en el icono <i
								class="fas fa-clipboard-list fa-1x" data-toggle="tooltip"
								data-placement="right" title="Mostrar Resultados"></i>
						</dd>
						<dd>
							<strong>Mostrar Gráficas:</strong>Para visualizar los resultados
							haga click en el icono <i class="fas fa-chart-bar fa-1x"
								data-toggle="tooltip" data-placement="right"
								title="Mostrar Graficos"></i>. <br>Podrá visualizar las
							gráficas incluso mientras la partida este en curso.
						</dd>
					</dl>
					<hr>
					<h2>Plantillas</h2>
					<hr>
					<dl>
						<dt>Guardar</dt>
						<dd>
							Necesitas que como minimo haya un elemento en el kanban, ya sea
							un usuario o una fase, una vez dado clic encima de <i
								class="fas fa-save  fa-1x"></i> nos pedirá un nombre.<br>
							Alerta, si se encuentra una plantilla con el mismo nombre no lo
							guardará, en caso contrario, se guardará automaticamente.
						</dd>
						<dt>Cargar</dt>
						<dd>Si quieres cargar plantillas simplemente tienes que darle
							al botón 'Cargar plantilla', seleccionar la que prefieras y a
							cargar, automaticamente se te cargará.</dd>
						<dt>Modificar</dt>
						<dd>A la hora de guardar cuando introduzcas un nombre que ya
							existe, se te preguntara si quieres sobreescribir esa plantilla,
							si se acepta, se procederá a modificar dicha plantilla y la
							proxima vez que se cargue, tendrá la modificacón añadida.</dd>
					</dl>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function() {
			$(".doubleButton").css({
				display : "none"
			});
			$(".doubleButton").toggle(0, function() {
				$(".doubleButton").css({
					width : "150px"
				});
				$("#doubleButton").css({
					width : "150px"
				});
			});
			$(".doubleButton").toggle(0, function() {
				$(".doubleButton").css({
					width : "150px"
				});
				$("#doubleButton").css({
					width : "150px"
				});
			})
			$("#arrow").click(function() {
				$(".doubleButton").toggle(function() {
					$(".doubleButton").css({
						width : "150px"
					});
					$("#doubleButton").css({
						width : "150px"
					});
				})
			})
		})
	</script>
	<jsp:include page="footer.jsp"></jsp:include>
</body>

</html>