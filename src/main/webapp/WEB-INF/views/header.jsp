<jsp:include page="/resources/links&Scripts/layout.jsp"></jsp:include>
<header>
	<div id="header-btn" class="btn-group">
		<a class="btn btn-success" onclick="mostrarKanban()" role="button" id="home">Home</a> 
		
		<a class="btn btn-success" role="button"
		data-toggle="modal" data-target="#modalDistribution" id="distributionChange">Cambiar Distribución</a> 
		
		<a class="btn btn-success" role="button"
			data-toggle="modal" data-target="#modalAddFases" id="nuevaFase">Nueva Fase</a>
			
		<a class="btn btn-success" role="button"
			data-toggle="modal" data-target="#modalSelectBlueprint" id="nuevaPlantilla">Cargar Plantilla</a>
	</div>
</header>