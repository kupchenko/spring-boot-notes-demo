var saveNote = function (id) {
    var title = $("#note-title").val();
    var content = $("#note-content").val();
    console.log("title " + title);
    console.log("content " + content);
    $.ajax({
        url: '/note/' + id,
        type: 'PUT',
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify({
            title: title,
            content: content
        }),
        success: function (result) {
            alert("Note with id [" + id + "] was saved successfully")
        },
        fail: function () {
            alert("Error while saving note")
        }
    });
};
var showNote = function (id) {
    // $("#id").className
    $.get("/note/" + id, function (data, status) {
        console.log("Data " + data.title + " - " + data.content);
        $("#note-title").val(data.title);
        $("#note-content").val(data.content);
        $(".card").each(function (i) {
            $(this).addClass('border-secondary').removeClass('text-white');
            $(this).addClass('list-item').removeClass('bg-primary');
        });
        var selector = '#' + id;
        $(selector)
            .addClass('text-white').removeClass('border-secondary')
            .addClass('bg-primary').removeClass('list-item');
    });
};