retrieveFilters = function(search, collection, filterName, value) {
  if (filterName.indexOf('filter[') === 0) {
    if (!search.$and) { search.$and = []; }

    let fieldName = filterName.replace('filter[', '').replace(']', '');
    const collectionFields = ForestAdmin.collections[collection].fields;

    const field = _.find(collectionFields, (field) => { return field.field === fieldName; });
    let valueParser = null;

    if (field && field.type === 'Number') {
      valueParser = (value) => { return parseInt(value, 10); };
    } else if (field && field.type === 'Boolean') {
      valueParser = (value) => { return value === 'true' ? true : false; };
    } else {
      valueParser = (value) => { return value; };
    }

    // TODO: Find a solution to avoid this hack everywhere in the code
    if (fieldName === 'id') { fieldName = '_id'; }

    _.each(value.split(','), (condition) => {
      let fieldCondition = {};
      if (condition === '$present') {
        fieldCondition[fieldName] = { $exists: true };
      } else if (condition === '$blank') {
        fieldCondition[fieldName] = { $exists: false };
      } else if (condition[0] === '*' && condition[condition.length - 1] === '*') {
        const regex = '.*' + valueParser(condition.substring(1, condition.length - 1)) + '.*'
        fieldCondition[fieldName] = { $regex: new RegExp(regex), $options: 'i' };
      } else if (condition[0] === '*') {
        const regex = '.*' + valueParser(condition.substring(1)) + '$'
        fieldCondition[fieldName] = { $regex: new RegExp(regex), $options: 'i' };
      } else if (condition[condition.length - 1] === '*') {
        const regex = '^' + valueParser(condition.substring(0, condition.length - 1)) + '.*'
        fieldCondition[fieldName] = { $regex: new RegExp(regex), $options: 'i' };
      } else if (condition[0] === '>') {
        fieldCondition[fieldName] = { $gt: valueParser(condition.substring(1)) };
      } else if (condition[0] === '<') {
        fieldCondition[fieldName] = { $lt: valueParser(condition.substring(1)) };
      } else if (condition[0] === '!') {
        fieldCondition[fieldName] = { $ne: valueParser(condition.substring(1)) };
      } else {
        fieldCondition[fieldName] = { $eq: valueParser(condition) };
      }
      search.$and.push(fieldCondition);
    });
  }
}
