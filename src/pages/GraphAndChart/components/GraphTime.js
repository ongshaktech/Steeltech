export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  // var months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // var year = a.getFullYear();
  // var month = months[a.getMonth()];
  // var date = a.getDate();

  // get hours in 12-hour format with AM/PM
  var hours = a.getHours();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;

  var min = a.getMinutes();
  min = min < 10 ? "0" + min : min;

  // var time = date + " " + month + ", " + year + " " + hours + ":" + min + " " + ampm;
  var time = hours + ":" + min + " " + ampm;
  return time;
}

// true values are peaks
function query_func(results, Start, End) {
  for (let i = 0; i < results.length; i++) {
    if (
      parseInt(results[i].time_start) >= Start &&
      parseInt(results[i].time_start) <= End
    ) {
      return true;
    } else if (
      parseInt(results[i].time_start) <= Start &&
      parseInt(results[i].time_end) >= End
    ) {
      return true;
    } else if (
      parseInt(results[i].time_start) >= Start &&
      parseInt(results[i].time_end) <= End
    ) {
      return true;
    } else if (
      parseInt(results[i].time_end) >= Start &&
      parseInt(results[i].time_end) <= End
    ) {
      return true;
    }
  }

  return false;
}

function split_time(time_span, results, startTime, endTime) {
  let new_dict = [];
  let segments = parseInt((endTime - startTime) / time_span);

  for (let i = 0; i < segments; i++) {
    let next_segment1 = i * time_span + startTime;
    let next_segment2 = (i + 1) * time_span + startTime;

    // query
    if (query_func(results, next_segment1, next_segment2)) {
      new_dict.push({
        Value: 1,
        time: timeConverter(next_segment1),
      });
    } else {
      new_dict.push({
        Value: 0,
        time: timeConverter(next_segment1),
      });
    }
  }

  return new_dict;
}

export default split_time;
