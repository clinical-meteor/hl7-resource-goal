
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
  Meteor.subscribe("Goals");
}

if (Meteor.isServer){
  Meteor.publish("Goals", function (argument){
    if (this.userId) {
      return Goals.find();
    } else {
      return [];
    }
  });
}


GoalSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Goal"
  },



});
Goals.attachSchema(GoalSchema);
