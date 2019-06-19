var N = ""
var E = ""
var h = window.innerHeight;
var w = window.innerWidth;
var temperatura = 0;
var units = "°C";
var metric = "";
var vrijeme = document.getElementById("kitica");
var prognoza = document.getElementById("tekstic");
var malitekst = document.getElementById("tekstic2");
var dugme = document.getElementById("temp-but");
var trenutnigrad = document.getElementById("grad");
var today = new Date();
var date = today.getDate();
var month = today.getMonth();

switch (month) {
  case 0: month = "January";
  break;
  case 1: month = "February";
  break;
  case 2: month = "March";
  break;
  case 3: month = "April";
  break;
  case 4: month = "May";
  break;
  case 5: month = "June";
  break;
  case 6: month = "July";
  break;
  case 7: month = "August";
  break;
  case 8: month = "September";
  break;
  case 9: month = "October";
  break;
  case 10: month = "November";
  break;
  case 11: month = "December";
  break;
}

$("#tekst").css("margin-top", Math.floor(h/2 - 200));

if (w > h*2.25) {
  $("body").css("background-size", "cover");
} else {
  $("body").css("background-size", "");
}

function position() {
  var h = window.innerHeight;
  var w = window.innerWidth;
  $("#tekst").css("margin-top", Math.floor(h/2 - 200));
  if (w > h*2.25) {
    $("body").css("background-size", "cover");
  } else {
  $("body").css("background-size", "");
  }
}

window.onload = position;
window.onresize = position;

dugme.addEventListener("click", jedinica);

function jedinica() {
  if (units == "°F") {
    units = "°C";
    dugme.innerHTML = "<strong>°F</strong>";
  } else if (units == "°C") {
    units = "°F";
    dugme.innerHTML = "<strong>°C</strong>";
  }
  navigator.geolocation.getCurrentPosition(pozicija);
}

function pozicija(pos) {
  N = pos.coords.latitude;
  E = pos.coords.longitude;
  if (units == "°C") {
    metric = "?units=si&";
  } else if (units == "°F") {
    metric = "?";
  }
  var link = "https://api.darksky.net/forecast/c2d9edd272370374b4cff4a5179d3002/" + N + "," + E + metric + "callback=?";
  console.log(link);
  $.getJSON(link, function(data) {
  var lokacija = data.timezone;
  vrijeme.innerHTML = data.currently.summary + " / " + Math.round(data.currently.temperature) + units;
    $("#precip").html("Precipitation: " + Math.round(data.currently.precipProbability*100) + "%")
    tekstic.innerHTML = data.hourly.summary.slice(0, data.hourly.summary.length - 1);
    tekstic2.innerHTML = data.daily.summary.slice(0, data.daily.summary.length - 1);
    trenutnigrad.innerHTML = lokacija.slice(lokacija.indexOf("/") + 1, lokacija.length) + ", " + month + " " + date;
    var ikonica = data.currently.icon;
    switch (ikonica) {
        case "clear-day": $("body").css("background-image", "url('http://i68.tinypic.com/17wneb.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136723.svg");
        break;
        case "clear-night": $("body").css("background-image", "url('https://i.ytimg.com/vi/KsHUrwV0Kek/maxresdefault.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136756.svg");
        $("body").css("background-repeat", "repeat");
        break;
        case "rain": $("body").css("background-image", "url('http://www.wallpaperup.com/uploads/wallpapers/2014/01/06/216707/abd00579533df4fd77afd5c2ece1cc61.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136711.svg");
        break;
        case "snow": $("body").css("background-image", "url('http://www.news1130.com/wp-content/blogs.dir/sites/9/2015/12/26/iStock_000051500010_Double.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/290/290408.svg");
        break;
        case "sleet": $("body").css("background-image", "url('http://oi64.tinypic.com/2j5yiis.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136733.svg");
        break;
        case "wind": $("body").css("background-image", "url('http://weknowyourdreams.com/images/wind/wind-04.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136712.svg");
        break;
        case "fog": $("body").css("background-image", "url('http://dreamatico.com/data_images/fog/fog-1.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/362/362382.svg");
        break;
        case "cloudy": $("body").css("background-image", "url('https://momentomoment.files.wordpress.com/2011/03/img_1136.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136701.svg");
        break;
        case "partly-cloudy-day": $("body").css("background-image", "url('https://www.goodfreephotos.com/albums/sky-and-clouds/cloud-patterns-in-partly-cloudy-sky.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136716.svg");
        break;
        case "partly-cloudy-night": $("body").css("background-image", "url('http://cdn.wallpapersafari.com/29/51/tQX2Au.jpg')");
        $("#ikona").attr("src", "https://image.flaticon.com/icons/svg/136/136719.svg");
        break;
      }
    temperatura = data.currently.temperature;
    if (units == "°F") {
      temperatura = (data.currently.temperature - 32)*5/9;
    }
    console.log(temperatura);
      switch (true) {
        case (temperatura >= 30):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/413/413440.svg");
        break;
        case (temperatura >= 25):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343356.svg");
        break;
        case (temperatura >= 20):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343418.svg");
        break;
        case (temperatura >= 15):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343378.svg");
        break;
        case (temperatura >= 10):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343389.svg");
        break;
        case (temperatura >= 5):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343414.svg");
        break;
        case (temperatura < 5):
        $("#top").attr("src", "https://image.flaticon.com/icons/svg/343/343415.svg");
      }
    if (data.currently.precipProbability >= 0.25) {
      $("#umbrella").attr({src:"https://image.flaticon.com/icons/svg/346/346177.svg", height:"50"});
    }
  });
  $("body").show();
}

navigator.geolocation.getCurrentPosition(pozicija);