
$(document).ready(function() {
// Current date
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
// Save Button 
$(".saveBtn").on("click", function() {
  var time = $(this).parent().attr("id");
  var event = $(this).siblings(".description").val();
  localStorage.setItem(time, event);
});
// Color block (PAST, PRESENT, and FUTURE)
  function updateHourlyColor() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).addClass(".past").removeClass(".present .future");
      } else if (blockHour === currentHour) {
        $(this).addClass(".present").removeClass(".past .future");
      } else {
        $(this).addClass(".future").removeClass(".past .present");
      }
    });
  }
// LocalStorage 
function loadEvents() {
  $(".time-block").each(function() {
    var time = $(this).attr("id");
    var event = localStorage.getItem(time);
    $(this).find(".description").val(event);
  });
}
// The functions are called here to load events
  loadEvents();
  updateHourlyColor();
  setInterval(updateHourlyColor, 60000); // Update every minute
});
