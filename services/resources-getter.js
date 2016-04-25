JSONAPISerializer = Npm.require('jsonapi-serializer').Serializer;

ForestAdmin.resourcesGetter = (collection, query) => {

  function getFilter() {
    let options = {};

    function setSort() {
      let sortColumn = null;
      let sortOrder = 1;

      if (query.sort) {
        if (query.sort[0] === '-') {
          sortOrder = -1;
          sortColumn = query.sort.substring(1);
        } else {
          sortColumn = query.sort;
        }
      }
      if (sortColumn) {
        if (sortColumn === 'id') {
          sortColumn = '_id'; // TODO: Handle this special case in a better way
        }
        options.sort = {};
        options.sort[sortColumn] = sortOrder;
      }
    }

    function setRange() {
      const pageNumber = parseInt(query['page[number]'], 10);
      const pageSize = parseInt(query['page[size]'], 10);

      if (!isNaN(pageNumber) && !isNaN(pageSize)) {
        options.skip = (pageNumber - 1) * pageSize;
      }
      if (!isNaN(pageSize)) {
        options.limit = pageSize;
      }
    }

    setSort();
    setRange();

    return options;
  }

  function getSearch() {
    let search = {};

    // NOTICE: String search case
    if (query.search) {
      _.each(ForestAdmin.collections[collection].fields, (field) => {
        if (field.type === 'String') {
          if (!search.$or) {
            search.$or = [];
          }
          let condition = {};
          let fieldName = field.field === 'id' ? '_id' : field.field;
          condition[fieldName] = new RegExp(query.search, 'i');
          search.$or.push(condition);
        }
      });
    }

    // NOTICE: Sharp searches case
    _.each(query, (value, filterName) => {
      retrieveFilters(search, collection, filterName, value);
    });

    return search;
  }

  const cursor = Meteor[collection].find(getSearch(), getFilter());
  const attributes = _.pluck(ForestAdmin.collections[collection].fields, 'field');

  var serializationOptions = {
    id: '_id',
    attributes: attributes,
    keyForAttribute: function (key) { return key === '_id' ? 'id' : key; },
    meta: { count: cursor.count() }
  };

  return new JSONAPISerializer(collection, cursor.fetch(), serializationOptions);
}
