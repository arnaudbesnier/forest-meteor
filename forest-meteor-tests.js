// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by forest-meteor.js.
import { name as packageName } from "meteor/forest-meteor";

// Write your tests here!
// Here is an example.
Tinytest.add('forest-meteor - example', (test) => {
  test.equal(packageName, "forest-meteor");
});
