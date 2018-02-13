
// create the object using our BaseModel
Goal = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Goal.prototype._collection = Goals;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Goals = new Mongo.Collection('Goals');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Goals._transform = function (document) {
  return new Goal(document);
};


if (Meteor.isClient){
  Meteor.subscribe('Goals');
}

if (Meteor.isServer){
  Meteor.publish('Goals', function (argument){
    if (this.userId) {
      return Goals.find();
    } else {
      return [];
    }
  });
}


GoalSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Goal'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  'subject' : {
    optional: true,
    type: ReferenceSchema
  },

  'startDate' : {
    optional: true,
    type: Date
  },
  'startCodeableConceptSchema' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'targetDate' : {
    optional: true,
    type: Date
  },
  'targetQuantity' : {
    optional: true,
    type: QuantitySchema
  },
  'category' : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  'description' : {
    optional: true,
    type: String
  },
  'status' : {
    optional: true,
    type: Code
  },
  'statusDate' : {
    optional: true,
    type: Date
  },
  'statusReason' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'author' : {
    optional: true,
    type: ReferenceSchema
  },
  'priority' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'addresses' : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  },
  'outcome.$.resultCodeableConceptSchema' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'outcome.$.resultReferenceSchema' : {
    optional: true,
    type: ReferenceSchema
  }
});
Goals.attachSchema(GoalSchema);

export default { Goal, Goals, GoalSchema };