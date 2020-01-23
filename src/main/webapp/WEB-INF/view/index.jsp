<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Notes</title>
    <link rel="stylesheet" href="/css/bootstrap.css"/>
    <link rel="stylesheet" href="/css/custom.min.css"/>
</head>
<body>
<div>
    <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark note-header-container-max-width">
        <div class="navbar-size linediv">
            <a href="../" class="navbar-brand">Notes</a>
        </div>
        <div class="navbar-size linediv">
            <div>
                <Button>
                    Create note
                </Button>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-4 list-item">
        <input class="form-control mr-sm-2 search-input" type="text"
               placeholder="Search"/>
        <div class="card text-white bg-primary mb-3">
            <div class="card-body">
                <h4 class="card-title">{note.title}</h4>
                <p class="card-text">{note.content}</p>
            </div>
        </div>
        <c:forEach items="${notesResponse.notes}" var="note">
            <div class="card border-secondary mb-3 list-item">
                <div class="card-body">
                    <h4 class="card-title">${note.title}</h4>
                    <p class="card-text">${note.content}</p>
                </div>
            </div>
        </c:forEach>

        <div class="pagination-body">
            <ul class="pagination pagination-sm">
                <li class="page-item">
                    <a class="page-link disabled"><</a>
                </li>
                <c:forEach var="i" begin="0" end="${notesResponse.pagination.numFound/notesResponse.pagination.rows}">
                    <li class="page-item active">
                        <a class="page-link">${i}</a>
                    </li>
                </c:forEach>
                <li class="page-item">
                    <a class="page-link">></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-lg-10 jumbotron note-content-top-padding">
        <div class="row">
            <div class="col-lg-12">
                <div class="page-header lead note-header-container">
                    <div class="linediv">
                        {title}
                    </div>
                    <div class="linediv">
                        <Button>
                            Save
                        </Button>
                    </div>
                </div>
                <hr class="my-4"/>
                <div class="textarea">

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>