# Forest Meteor Liana

The unofficial MeteorJS liana for Forest.

## Requirements

This package work in a specific configuration. Your Meteor project must:
- Use the aldeed:simple-schema Meteor package (https://github.com/aldeed/meteor-simple-schema)
- Define a schema for each collection you want to see in ForestAdmin
- Store your collections schemas in the global variable `Meteor.Schemas` as described below:
```javascript
Meteor.Schemas = {};
Meteor.Schemas.Rentals = new SimpleSchema({
  city: {
    type: 'String'
  },
  // ...
});
```

## Installation

1. Run `meteor add forest-meteor` in your Meteor project.
2. Add the following configuration in your settings.json file
```json
{
  "public": {},
  "private": {
    "forest": {
      "secretKey": "<FORESTADMIN_SECRET_KEY>"
    }
  }
}
```

## Limitations

The package provide only a fraction of the features provide by ForestAdmin but your can:

- Create documents,
- Read documents (with sort and pagination),
- Update documents,
- Delete documents

## TODO

- Set the documents ids in a "read-only" mode,
- Implement the documents filters,
- Implement activity logging,
- Implement stats to populate the dashboard,
- Implement the authentication system,
- Implement third-party integrations (Intercom, Stripe,... ),
- Add specs in the future.
- ...
