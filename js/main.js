mobiscroll.setOptions({
  theme: "material",
  themeVariant: "dark",
});
let format = "yyyy/MM/DD HH:mm";
let currentTime = moment();
let dvrTime;
let diffMinutes;
setInterval(() => {
  currentTime = moment();

  $("#current-time").text(`Current Time: ${currentTime.format(format)}`);
}, 1000);
$(function () {
  $("#dvr-time")
    .mobiscroll()
    .datepicker({
      controls: ["time", "calendar"],
      touchUi: true,
      display: "bottom",
      timeFormat: "HH:mm",
      timeWheels: "HHmm",
      returnFormat: "moment",
      onChange(e) {
        dvrTime = e.value;
        $("#dif-time").mobiscroll("setVal", "");
        $("#correct-time").text("");
        var diff = moment.duration(dvrTime.diff(currentTime));
        diffMinutes = diff.asMinutes();
        $("#day").text(Math.abs(diff.days()));
        $("#hr").text(Math.abs(diff.hours()));
        $("#min").text(Math.abs(diff.minutes()));

        if (currentTime.isBefore(dvrTime)) {
          $("#dvr-diff").removeClass("before");
          $("#dvr-diff").addClass("after");
          $("#af-bf").text("+");
        } else {
          $("#dvr-diff").removeClass("after");
          $("#dvr-diff").addClass("before");
          $("#af-bf").text("-");
        }
        $("#hide").fadeIn();
      },
    });

  $("#dif-time")
    .mobiscroll()
    .datepicker({
      controls: ["time", "calendar"],
      touchUi: true,
      display: "bottom",
      timeFormat: "HH:mm",
      timeWheels: "HHmm",
      returnFormat: "moment",
      onChange(e) {
        $("#correct-time").text(
          e.value.add(diffMinutes, "minutes").format(format)
        );
      },
    });
});
