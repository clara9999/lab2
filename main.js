function setMonthAndDay(month, day) {
    var currentYear = new Date().getFullYear();
    return new Date(currentYear, month - 1, day);
}

function generateCourseTable(startDate) {
    $("#courseTable").empty();
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    var topicCount = topic.length;
    var milisecsPerDay = 24 * 60 * 60 * 1000;
    var noClassDates = ["2023/2/21", "2023/2/28" , "2023/4/4"];

    for (var x = 0; x < topicCount; x++) {
        var rowClass = x % 2 === 0 ? "even-row" : "odd-row";
        var currentDate = new Date(startDate.getTime() + 7 * x * milisecsPerDay);
        var isNoClass = noClassDates.includes(currentDate.toLocaleDateString());
        
        var currentRow = $("<tr>").addClass(rowClass);
        currentRow.append(`<td>${x + 1}</td>`);
        currentRow.append(`<td>${currentDate.toLocaleDateString().slice(5)}</td>`);
        currentRow.append(`<td>${topic[x]}</td>`);

        if (isNoClass) {
            currentRow.find("td").css("color", "gray");
        }

        $("#courseTable").append(currentRow);
    }
}

$(function () {
    $("#setStartDate").on("click", function () {
        var startDateInput = $("#startDateInput").val();
        if (startDateInput) {
            var startDate = new Date(startDateInput);
            generateCourseTable(startDate);
        } else {
            alert("請選擇第一天的日期！");
        }
    });

    var newStartDate = setMonthAndDay(2, 21);
    generateCourseTable(newStartDate);

    $("#addTopic").on("click", function () {
        var topicInput = $("#topicInput").val();
        if (topicInput) {
            topic.push(topicInput);
            var startDateInput = $("#startDateInput").val();
            if (startDateInput) {
                var startDate = new Date(startDateInput);
                generateCourseTable(startDate);
            } else {
                generateCourseTable(newStartDate);
            }
        } else {
            alert("請輸入新活動主題！");
        }
    });
});
