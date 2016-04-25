ForestAdmin.resourceCreator = (collection, attributes, callback) => {
  Meteor[collection].insert(attributes, callback);
}
