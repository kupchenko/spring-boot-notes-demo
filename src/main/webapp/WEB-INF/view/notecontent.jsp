<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<body>
<div class="col-lg-10 jumbotron note-content-top-padding">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-header lead note-header-container">
                <div class="linediv">
                    <input id="note-title" value="${note.title}" placeholder="Note title">
                </div>
                <div class="linediv">
                    <Button onclick="saveNote('${note.id}')">
                        Save
                    </Button>
                </div>
            </div>
            <hr class="my-4"/>
            <div class="textarea">
                <textarea id="note-content" name="note-content" placeholder="Note content.."
                          style="height:200px">${note.content}</textarea>
            </div>
        </div>
    </div>
</div>
</body>
</html>