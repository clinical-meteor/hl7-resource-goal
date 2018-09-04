import SimpleSchema from 'simpl-schema';

// create the object using our BaseModel
Goal = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Goal.prototype._collection = Goals;

// // Create a persistent data store for addresses to be stored.
// // HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');

if(typeof Goals === 'undefined'){
  if(Package['clinical:autopublish']){
    Goals = new Mongo.Collection('Goals');
  } else {
    Goals = new Mongo.Collection('Goals', {connection: null});
  }
}

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Goals._transform = function (document) {
  return new Goal(document);
};



GoalSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Goal'
  },
  'identifier' : {
    optional: true,
    type: Array
  },
  'identifier.$' : {
    optional: true,
    type: IdentifierSchema 
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
    type: Array
  },
  'category.$' : {
    optional: true,
    type: CodeableConceptSchema 
  },
  'description' : {
    optional: true,
    type: String
  },
  'status' : {
    optional: true,
    type: Code,
    allowedValues: ['proposed', 'planned', 'accepted', 'rejected', 'in-progress', 'achieved', 'sustaining', 'on-hold', 'cancelled']
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
    type: Array
  },
  'addresses.$' : {
    optional: true,
    type: ReferenceSchema 
  },
  'note' : {
    optional: true,
    type: Array
  },
  'note.$' : {
    optional: true,
    type: AnnotationSchema 
  },

  'outcome' : {
    optional: true,
    type: Array
  },
  'outcome.$' : {
    optional: true,
    type: Object
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

BaseSchema.extend(GoalSchema);
DomainResourceSchema.extend(GoalSchema);
Goals.attachSchema(GoalSchema);

export default { Goal, Goals, GoalSchema };