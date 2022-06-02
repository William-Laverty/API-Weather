<template>
   <div class="content-wrapper">
      <h2>Forecast Canberra</h2>
      <p>{{canberraCurrent.temp }}<span style="font-size:48px"> °C</span></p>
      <p>
         Humidity: {{ canberraCurrent.humidity }}%
         <br/>
         Windspeed: {{canberraCurrent.wind }} km/h
      </p>

      <br/><br/>

      <h2>Forecast Sydney</h2>
      <p>{{sydneyCurrent.temp }}<span style="font-size:48px"> °C</span></p>
      <p>
         Humidity: {{ sydneyCurrent.humidity }}%
         <br/>
         Windspeed: {{sydneyCurrent.wind }} km/h
      </p>
   </div>
</template>

<!-- API# 74e67c35b26620fcd0bebbc4a1e14a6c -->

<script>
  export default {
    setup() {
      // Var
      let sydney = Vue.ref('');
      let canberra = Vue.ref();
      let resultsCBR = Vue.ref('');
      let resultsSYD = Vue.ref('');

      // Fetches location weather
      let locationFetch = async function() {
         let loadCanberra = await fetchURL('https://api.openweathermap.org/data/2.5/weather?q=canberra&appid=74e67c35b26620fcd0bebbc4a1e14a6c');
         let loadSydney = await fetchURL("https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=74e67c35b26620fcd0bebbc4a1e14a6c");
         resultsCBR.value = loadCanberra;
         resultsSYD.value = loadSydney;
         console.log("Canberra: " + canberra.value + "Sydney: " + sydney.value);
         fetchWeather();
      }

      // Worked with ian on this section
      let fetchWeather = function() {
         // CBR Weather
         console.log('Getting Weather Description for CBR')
         canberraCurrent.value.temp = Math.round(resultsCBR.value.temp);
         canberraCurrent.value.humidity = resultsCBR.value.humidity;
         canberraCurrent.value.date = new Date((resultsCBR.value.dt + resultsCBR.value.timezone_offset) * 1000).toLocaleDateString("en-UK"); // Based off UTC time value
         canberraCurrent.value.wind = Math.round(resultsCBR.value.wind_speed);

         // SYD Weather
         console.log('Getting Weather Description for CBR')
         sydneyCurrent.value.temp = Math.round(resultsSYD.value.temp);
         sydneyCurrent.value.humidity = resultsSYD.value.humidity;
         sydneyCurrent.value.date = new Date((resultsSYD.value.dt + resultsSYD.value.timezone_offset) * 1000).toLocaleDateString("en-UK"); // Based off UTC time value
         sydneyCurrent.value.wind = Math.round(resultsSYD.value.wind_speed);
      }
      // Return variables
      return {
        sydney, canberra, resultsCBR, resultsSYD, currentWeather, locationFetch, fetchWeather, loadSydney, loadCanberra, canberraCurrent, sydneyCurrent
      }
    }
  }
</script>