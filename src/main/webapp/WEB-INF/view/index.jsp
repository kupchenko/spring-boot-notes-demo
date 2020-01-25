<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Notes</title>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/custom.min.css"/>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="js/note.js"></script>
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="row">
    <div class="col-lg-4 list-item">
        <input class="form-control mr-sm-2 search-input" type="text"
               placeholder="Search"/>

        <jsp:include page="notelist.jsp"/>
        <jsp:include page="pagination.jsp"/>
    </div>
    <jsp:include page="notecontent.jsp"/>
</div>
</body>
</html>