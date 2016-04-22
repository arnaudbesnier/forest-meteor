ForestAdmin.resourceUpdater = (collection, recordId, attributes) => {
  Meteor[collection].update(recordId, {$set: attributes});
}
