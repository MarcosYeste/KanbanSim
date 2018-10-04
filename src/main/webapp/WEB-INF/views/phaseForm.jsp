<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<jsp:include page="header.jsp"></jsp:include>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<body>
<div class="row">
	<form:form modelAttribute="fase" cssClass="form-horizontal" action="/addFase" method="post">
		<div class="form-group">
			<form:label cssClass="col-sm-3 " path="name">Nombre</form:label>
			<div class="col-sm-4">
			<form:input cssClass="form-control" path="name" />
			</div>
		</div>
		<div class="form-group">
			<form:label cssClass="col-sm-3 " path="maxTasks">maxTasks</form:label>
			<div class="col-sm-4">
			<form:input cssClass="form-control" path="maxTasks" />
			</div>
		</div>
				
		<div class="col-sm-8"><button type="submit"  class="btn btn-primary">SAVE</button></div>
		


	</form:form>
	</div>
</body>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</html>