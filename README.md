# Events_manager
This app is a tool used to browse and manage evnets happening anywhere/anytime.

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

Addictionaly user sees the distance between him and the event in kiloemeters thanks to google geolocation service (if the
right permition is given).

Users can browse through events by two ways:
*   list of events, which can be sorted by name and date of events, filtered by the search filed.
*   by the map - every event has marker on it. When user clicks on it, the popup with event data is shown. It can also be
clicked to redirect to the event full description site.

When user is on the specific event site, there is option to edit event - all data can be rewritten. The second option is
to delete event.

