import SimpleSchema from 'simpl-schema';
import { get } from 'lodash';

// create the object using our BaseModel
Goal = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Goal.prototype._collection = Goals;

Goal.prototype.generateNarrative = function(){
  if(this.text){
    return this.text;
  } else {
    return get(this, 'description', 'An undefined goal.')
  }
}

// // Create a persistent data store for addresses to be stored.
// // HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');

if(typeof Goals === 'undefined'){
  if(Package['clinical:autopublish']){
    Goals = new Mongo.Collection('Goals');
  } else if(Package['clinical:desktop-publish']){    
    Goals = new Mongo.Collection('Goals');
  } else {
    Goals = new Mongo.Collection('Goals', {connection: null});
  }
}

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Goals._transform = function (document) {
  if(!get(document, ''))
  return new Goal(document);
};



GoalDstu2 = new SimpleSchema({
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
    type: String
  },
  'status' : {
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


GoalStu3 = new SimpleSchema({
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
  'status' : {
    type: Code,
    allowedValues: ['proposed', 'accepted', 'planned', 'in-progress', 'on-target', 'ahead-of-target', 'behind-target', 'sustaining', 'achieved', 'on-hold', 'cancelled', 'entered-in-error', 'rejected']
  },
  'category' : {
    optional: true,
    type: Array
  },
  'category.$' : {
    optional: true,
    type: CodeableConceptSchema 
  },
  'priority' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'description' : {
    optional: true,
    type: CodeableConceptSchema
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
  'target' : {
    optional: true,
    type: Object
  },
  'target.measure' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'target.detailQuantity' : {
    optional: true,
    type: QuantitySchema
  },
  'target.detailRange' : {
    optional: true,
    type: RangeSchema
  },
  'target.detailCodeableConcept' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'target.dueDate' : {
    optional: true,
    type: Date
  },
  'target.dueDuration' : {
    optional: true,
    type: QuantitySchema
  },      
  'statusDate' : {
    optional: true,
    type: Date
  },
  'statusReason' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'expressedBy' : {
    optional: true,
    type: ReferenceSchema
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
  'outcomeCode' : {
    optional: true,
    type: Array
  },
  'outcomeCode.$' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'outcomeReference' : {
    optional: true,
    type: Array
  },
  'outcomeReference.$' : {
    optional: true,
    type: CodeableConceptSchema
  },
});



GoalSchema = GoalDstu2;


BaseSchema.extend(GoalSchema);
DomainResourceSchema.extend(GoalSchema);
Goals.attachSchema(GoalSchema);

export default { Goal, Goals, GoalSchema, GoalDstu2, GoalStu3 };