ForestAdmin.resourceUpdater = (collection, recordId, attributes, callback) => {
  Meteor[collection].update(recordId, {$set: attributes}, callback);
}
