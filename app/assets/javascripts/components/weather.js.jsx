var Weather = React.createClass({
  // save the icon code and temperature from OpenWeatherMap 
  getInitialState: function() {
    return ({ 
      iconCode: null,
      temp: null 
    });
  },

  // get weather every 15 minutes
  componentDidMount: function() {
    window.setInterval(function() {
      this.getWeather();
    }.bind(this), 900000);
  },

  // get weather if coordinates sent by Display changes
  componentDidUpdate: function(prevProps) {
    if (this.props !== prevProps) {
      this.getWeather();
    }
  },

  // call weather API and call save function
  getWeather: function() {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.props.latitude + "&lon=" + this.props.longitude + "&units=imperial&APPID=" + this.props.openWeatherMapApiKey;
    var that = this;

    // jQuery get request that saves the icon code and temp to variables and passes it to state.
    $.get(weatherURL).done(function(response) {
      console.log(response);

      var weatherIconCode = response.weather[0].icon;
      var temp = Math.round(response.main.temp);

      that.saveWeather(weatherIconCode, temp);
    });
  },

  // format className from idCode and save to state
  saveWeather: function(iconCode, temp) {
    this.setState({ 
      iconCode: iconCode,
      temp: temp 
    });

  },

  // maps the icon codes from OpenWeatherMap to the name of the associated picture in the assets folder.
  getIcon: function() {
    var iconAssociations = {
      "01d": "clear-day",
      "02d": "partly-cloudy",
      "03d": "mostly-cloudy",
      "04d": "mostly-cloudy",
      "09d": "rainy-day",
      "10d": "rainy-day",
      "11d": "storm-weather-day",
      "50d": "haze-day",
      "01n": "clear-night",
      "02n": "partly-cloudy-night",
      "03n": "mostly-cloudy-night",
      "04n": "mostly-cloudy-night",
      "09n": "rainy-night",
      "10n": "rainy-night",
      "11n": "storm-weather-night",
    }

    return iconAssociations[this.state.iconCode]
  },

  render: function() {
    return (
      <div className="weather">
        <p className="temperature">{this.state.temp}??F</p>
        <img src={'/assets/' + this.getIcon() + '.png'} className="icon"/>  
      </div>
    )
  }
})