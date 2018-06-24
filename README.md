# Events_manager
This app is a tool used to browse and manage events happening anywhere/anytime.

# General description

App allows users to browse through events existing in database. Every event has specific data stored:
*   name of event,
*   place,
*   date (start and end time),
*   short description,
*   full description,
*   image URL,
*   organisation,
*   type of event,
*   google maps coordinates and placeID.

Additionally user sees the distance between him and the specific event.

Users can browse through events by two ways:
*   list of events, which can be sorted by name and date of events, filtered by the search filed.
*   by the map - every event has marker on it. When user clicks on it, the popup with event data is shown. It can also be
clicked to redirect to the event full description site.

When user is on the specific event site, there is option to edit event - all data can be rewritten. The second option is
to delete event.

# Purpose and technology

## JavaScript React

My purpose of this app was to create my first project showcasing JavaScript React technology. Site is entirely built with
react components - it only reloads parts of the site which change, not the entire site, as in traditional project.

Main views are handled by react router - change in page url forces react to render different components in main section
(header and footer remains unchanged). It works in the way shown below:
*   url ends with '/' - main site showing the field to search through events,
*   url ends with '/events' - site with all events shown as the list,
*   url ends with '/events/*eventID* - site with specific event description,
*   url ends with '/addevents' - site with event creator,
*   url ends with '/map' - site with map showing all markers of events stored in database.

## Webpack, ECMAScript

My development environment is based on Webpack. My configuration allows to:
*   use newest ECMAScript functionality without the risk of not supporting older browsers (babel loader),
*   process sass code to css format,
*   test project with dev-server which allowed me to see instant changes in page after saving the file,
*   build the whole page in build folder which is ready to deploy on the server.

## Sass

For easier and cleaner css code I used Sass compiler. Files are separated in familliar way as components are.

## Firebase, Google maps/places API

For better functionality, external API's were used. Site is communicating with them by using fetch services.

For permanent data storage Firebase realtime database API is used. Events are stored in JSON format.
Every time event is added/modified/deleted - specific fetch service is updating data on the server.

It was important to show specific location for every event - that's where google maps API comes in hand. 
I used it to allow users to mark the positions of newly added events (places API was used additionally for autocomplete
functionality). 

Google geolocation service was used to calculate the distance between user and the event.

 
 