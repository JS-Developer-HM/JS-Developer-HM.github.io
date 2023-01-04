let format = "yyyy/MM/DD HH:mm";
let currentTime = moment();
let dvrTime;
let diffMinutes;
let diffTime = null;
let currentDate = null;

let datePickerOptions = {
  controls: ["time", "calendar"],
  touchUi: true,
  display: "bottom",
  timeFormat: "HH:mm",
  timeWheels: "HHmm",
  returnFormat: "moment",
};

mobiscroll.setOptions({
  theme: "material",
  themeVariant: "dark",
});
setInterval(() => {
  currentTime = moment();
  $("#current-time").text(`Current Time: ${currentTime.format(format)}`);
}, 100);
$(function () {
  $("#dvr-time")
    .mobiscroll()
    .datepicker({
      ...datePickerOptions,
      onChange(e) {
        dvrTime = e.value;
        // $("#dif-time").mobiscroll("setVal", "");
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

        if (diffTime != null) {
          $("#res-dif-time")
            .show()
            .text(
              new moment(diffTime).add(diffMinutes, "minutes").format(format)
            );
        }
        if (currentDate != null) {
          $("#res-current-date")
            .show()
            .text(
              new moment(currentDate)
                .add(diffMinutes * -1, "minutes")
                .format(format)
            );
        }
      },
    });

  $("#dif-time")
    .mobiscroll()
    .datepicker({
      ...datePickerOptions,
      onChange(e) {
        diffTime = e.value;
        $("#res-dif-time")
          .show()
          .text(
            new moment(diffTime).add(diffMinutes, "minutes").format(format)
          );
      },
    });

  $("#current-date")
    .mobiscroll()
    .datepicker({
      ...datePickerOptions,
      onChange(e) {
        currentDate = e.value;
        $("#res-current-date")
          .show()
          .text(
            new moment(currentDate)
              .add(diffMinutes * -1, "minutes")
              .format(format)
          );
      },
    });
});
