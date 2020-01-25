<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<div class="pagination-body">
    <ul class="pagination pagination-sm">
        <li class="page-item">
            <a class="page-link disabled"><</a>
        </li>
        <c:forEach var="i" begin="0"
                   end="${notes.pagination.numFound/notes.pagination.rows}">
            <li class="page-item active">
                <a class="page-link">${i}</a>
            </li>
        </c:forEach>
        <li class="page-item">
            <a class="page-link">></a>
        </li>
    </ul>
</div>
</body>