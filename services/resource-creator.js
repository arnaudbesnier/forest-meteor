ForestAdmin.resourceCreator = (collection, attributes) => {
  Meteor[collection].insert(attributes);
}
