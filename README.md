## clinical:hl7-resource-goal

#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  

[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-goal/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-goal/tree/master)


#### API Reference  

The resource in this package implements Goal resource schema, specified at [https://www.hl7.org/fhir/DSTU2/goal.html](https://www.hl7.org/fhir/DSTU2/goal.html).  


#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-goal

# to initialize default data
INITIALIZE=true meteor
````


#### Example   

```js
var newGoal = {

}
Goals.insert(newGoal);
```


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


#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

   
#### Acknowledgements     

Many thanks to DxRx Medical and Progressive Health of Delaware for their generous support in sponsoring this package.