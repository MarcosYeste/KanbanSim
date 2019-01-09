<%@page import="com.kanban.app.services.KanbanService"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" type="image/x-icon" href="/resources/img/favicon.png" />
<title>Kanban</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="UTF-8">
<!-- JQuery  -->

<script src="/resources/libs/js/jquery-3.3.1.js"></script>
<link rel="stylesheet"	href="/resources/libs/css/jquery-ui.css">
<script src="/resources/libs/js/jquery-ui/jquery-ui.js"></script>
<!-- Bootstrap -->
<link rel="stylesheet" href="/resources/libs/css/bootstrap/4.1.3/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Orbitron:500" rel="stylesheet">
<!-- Personal CSS -->
<link rel="stylesheet" href="/resources/css/styles.css">
<!--  Charts chart.js  -->
<script src="/resources/libs/js/Chart.bundle.js"></script>
<script src="/resources/libs/js/Chart.js"></script>
 


</head>