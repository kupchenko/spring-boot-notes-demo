<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<c:forEach items="${notes.notes}" var="note" varStatus="loop">
    <c:choose>
        <c:when test="${loop.index == 0}">
            <div id="${note.id}" class="card mb-3 text-white bg-primary" onclick="showNote('${note.id}')">
                <div class="card-body">
                    <h4 class="card-title">${note.title}</h4>
                    <p class="card-text">${note.content}</p>
                </div>
            </div>
        </c:when>
        <c:otherwise>
            <div id="${note.id}" class="card mb-3 border-secondary list-item" onclick="showNote('${note.id}')">
                <div class="card-body">
                    <h4 class="card-title">${note.title}</h4>
                    <p class="card-text">${note.content}</p>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
</c:forEach>
</body>
</html>