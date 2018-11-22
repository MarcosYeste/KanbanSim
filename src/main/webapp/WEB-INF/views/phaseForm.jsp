<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<jsp:include page="header.jsp"></jsp:include>

<body>

	<div class="row card mb-3 border-info mx-auto"
		style="max-width: 45rem;">

		<div class="card-header bg-info font-weight-bold">Crear Nueva Fase</div>

		<div class="card-body">

			<form:form modelAttribute="fase" cssClass="form-horizontal"	action="/addFase" method="post">

				<div class="form-group">

					<form:label cssClass="col-sm-3 " path="name">Nombre</form:label>

					<div class="col-sm-12">

						<form:input cssClass="form-control" path="name"	required="required" placeholder="Introduce Nombre Fase" />

					</div>
				</div>

				<div class="form-group">

					<form:label cssClass="col-sm-3 " path="maxTasks">WIP</form:label>

					<div class="col-sm-12">

						<form:input cssClass="form-control" path="maxTasks"	required="required" value="1" />

					</div>
				</div>

				<!-- Introduce el rango de tiempo en el cual la tarea se puede llegar a pasar -->
				<div class="container">
					<div class="row">

						<div class="form-group col">
							<form:label path="minTime">Tiempo Mínimo</form:label>
							<div>
								<form:input cssClass="form-control" path="minTime"	required="required" value="1" />
							</div>
						</div>

						<div class="form-group col">
							<form:label path="maxTime">Tiempo Máximo</form:label>
							<div>
								<form:input cssClass="form-control" path="maxTime"	required="required" value="1" />
							</div>
						</div>
					</div>
				</div>

				<div class="form-group">
					<form:label path="color" for="color-input"
						cssClass="col-2 col-form-label">Color:</form:label>
					<div class="col-10">
						<form:input class="form-control" type="color" value="#4ce600" id="color-input" list="presetColors" path="color" />
					</div>

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

				<div class="col-sm-8">
					<br>

					<button type="submit" class="btn btn-primary">SAVE</button>

				</div>
			</form:form>
		</div>
	</div>

</body>
</html>