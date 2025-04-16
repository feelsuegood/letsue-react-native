# SueWeather App

A simple weather application built with React Native and Expo, providing real-time weather information based on your current location.

## Features

- 📍 Location-based weather information
- 🌡️ Temperature display
- 🌤️ Weather conditions with descriptions
- 📅 3-hour interval weather forecast
- 📱 Horizontal swipeable interface
- 🏙️ Current city display

## Technologies Used

- React Native
- Expo
- TypeScript
- OpenWeatherMap API
- expo-location for geolocation

## Environment Setup

This project requires an API key from OpenWeatherMap. To get one:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Generate an API key from your account
3. Add the API key to your `.env` file

## Usage

The app will request permission to access your location. Once granted, it will:

1. Display your current city
2. Show the current temperature
3. Provide weather conditions and descriptions
4. Allow you to swipe horizontally to view the 5-day forecast

## Improvements

1. Add a settings screen to change the temperature unit
2. Support for multiple locations
3. Add weather alerts and notifications
4. Implement offline support for previously fetched data
5. Add more detailed weather information (humidity, wind speed, etc.)

## Inspiration

- [Weather App Concept by Caroline Lenzing](https://dribbble.com/shots/14717133-Weather-App-Concept)
