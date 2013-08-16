Modern Technology Council
=========================
This project is in extreme rapid development. Please excuse the lack/hack of architecture while we grow this into a mature app.
Quick and dirty was the goal due to the rapid progress of the MT Council and immediate need for some web presence.


Short-Term Hackings
---------------------
NOTE: We're still determining whether or not to use a mature framework in order to allow a better entry-level for our students.

The primary controller is [app/js/main.js](/app/js/main.js) and the ```chageState()``` function.
This is intended as a short term single-page router based on old-style /#/hash. At this time ```changeState()```
reads the hash and looks for the corresponding [hash].html template match and renders it.

So... ```/#/RSVP``` matches ```app/RSVP.html```

A custom control can be created in the switch case, otherwise ```default:``` does all the work. ```partMenu()```
is required for custom page loads.

Additional controls are added in the html template files.

``` $(document).on('panelReady', callback) ```
gives you access to the DOM after the page is loaded. Required due to the 200ms fadeIn().

Supporting functions are found in [app/js/library.js](/app/js/library.js).

You only need to modify the corresponding html template and css to make changes or create a new template if required.

set ```resizeOveride=true``` in your console to stop the annoying resize reload.




