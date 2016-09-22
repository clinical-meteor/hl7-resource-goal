##clinical:hl7-resource-goal

HL7 FHIR Resource - Goal

===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource DTSU2 schema provided at  [https://www.hl7.org/fhir/goal.html](https://www.hl7.org/fhir/goal.html).  

===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-goal

# to initialize default data
INITIALIZE=true meteor
````


===============================
#### Example   

```js
var newGoal = {

}
Goals.insert(newGoal);
```

===============================
#### Extending the Schema

```js
ExtendedGoalSchema = new SimpleSchema([
  GoalSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
Goals.attachSchema( ExtendedGoalSchema );
```

===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
