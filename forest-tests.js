// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by forest-meteor.js.
import { name as packageName } from "meteor/arnaudbesnier:forest";

// Write your tests here!
// Here is an example.
Tinytest.add('forest-meteor - example', (test) => {
  test.equal(packageName, "arnaudbesnier:forest");
});
