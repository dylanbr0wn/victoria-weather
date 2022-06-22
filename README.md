![weather_logo500](https://user-images.githubusercontent.com/40218657/174922477-3f885f97-f2b8-4e73-8c3a-0aca8e9d0cc5.png)

 Welcome! 👋 Victoria weather is a small web application that gives you a quick summary of the current weather conditions in the Victoria, BC! 
 The goal of this project was to build a modern, pleasing web interface for open source data provided by the [school-based weather station network](https://victoriaweather.ca/).
 
 ## Features
 
 🗺 - Fully interactive map of Victoria with temperature visualization and point information powered by [Mapbox](https://www.mapbox.com/) 
   
 💧 - Average rain stats from across Victoria  
   
 🌡 - Temperature averages aswell as max/min locations  
   
 🌗 - Sunrise/Sunset time indicator  
   
 ☁️ - Weather forcast (Coming soon)  
 
 ## How it works
 
Every minute, a server script is pulling the weather data and computing the temperature map layer using [kriging interpolation](https://www.publichealth.columbia.edu/research/population-health-methods/kriging-interpolation). We are then computing the isobands (the bands of similar temperature) using the [marching squares algorithm](https://en.wikipedia.org/wiki/Marching_squares). These temperature bands, along with a plethora of other useful data is then stored in a [MongoDB](https://www.mongodb.com/) document database for quicker access when loading the page.
