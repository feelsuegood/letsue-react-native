# SueWeather App

A simple weather application built with React Native and Expo, providing real-time weather information based on your current location.

## Features

- 📍 Real-time location-based weather information
- 🌡️ Current temperature display
- 🌤️ Weather conditions with descriptions
- 📅 5-day weather forecast
- 📱 Horizontal swipeable interface
- 🏙️ Current city display

## Technologies Used

- React Native
- Expo
- TypeScript
- OpenWeatherMap API
- expo-location for geolocation

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

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
