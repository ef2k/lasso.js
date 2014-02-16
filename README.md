Lasso.js
========

A jQuery plugin that hooks into events and sprinkles some 1-time data-binding.

When you should use it
----------------------

* You have existing markup and all you want is to bind those darn table rows to their corresponding data.

* You have no need for two-way data-binding. You just want to track what HTML elements belong to what data.

* You don't want to drop in an actual MV* framework, cuz your code is mostly jQuery.

* The data you want to bind is in an Array. (PRs for object literals are welcome).


What it does
------------

* Lasso allows you to bind array data to HTML elements using a jQuery selector.

* Lasso allows you to remove array data and keeps your bound elements in sync (Though, you have to remove the DOM node yourself).

What it doesnt do
-----------------
* Lasso doesnt generate HTML elements from your data. (Use handlebars for that!)

* Lasso doesnt keep your DOM elements updated when the data changes.


Usage
-----
> **Assumption**: You already have your HTML elements rendered.

```js

var albums = [
    {id: 1, title: "Dark Side of the Moon", artist: "Pink Floyd"},
    {id: 2, title: "Exile on Main St. Haze", artist: "The Rolling Stones"},
    {id: 3, title: "London Calling", artist: "The Clash"},
    {id: 4, title: "MM..Food", artist: "MF Doom"},
    {id: 5, title: "Reachin'", artist: "Digable Planets"}
];


// Find out what data is bound to the clicked element.
$("#albums tr").lasso("click", albums, function (evt) {
    var boundElem = evt.lasso;
    console.log("Clicked on " + boundElem.item.title + " by " + boundElem.item.artist);

    // Lets say you want to remove the data from the array, we can do that too...
    boundElem.remove();
    // Though, its up to you to keep the DOM updated:
    $(this).remove();
});

```

API
----
```js
$(SELECTOR).lasso(EVENT_TYPE, DATA_ARRAY, EVENT_HANDLER);
```

* `SELECTOR` - A normal jQuery selector. E.g: `'#my-table tr'`
* `EVENT_TYPE` - Any event supported by jQuery. E.g: `click`, `mouseover`, etc.
* `DATA_ARRAY` - The data array you want to bind to.
* `EVENT_HANDLER` - A normal jQuery event handler. The context of `this` will be the selected HTML element.

TODO
----

* Add some tests.
* Support object literals
 
