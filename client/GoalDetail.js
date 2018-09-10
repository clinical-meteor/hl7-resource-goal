// =======================================================================
// Using DSTU2  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// https://www.hl7.org/fhir/DSTU2/goal.html
//
//
// =======================================================================


import { CardActions, CardText } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { get, set} from 'lodash';
import PropTypes from 'prop-types';


export default class GoalDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalId: false,
      goal: {
        resourceType: "Goal",
        description: '',
        priority: {
          text: ''
        },
        status: ''
      },
      form: {
        description: '',
        priority: '',
        status: ''
      }
    }
  }
  dehydrateFhirResource(goal) {
    let formData = Object.assign({}, this.state.form);

    formData.description = get(goal, 'description')    
    formData.priority = get(goal, 'priority')
    formData.status = get(goal, 'status')

    return formData;
  }
  shouldComponentUpdate(nextProps){
    process.env.NODE_ENV === "test" && console.log('GoalDetail.shouldComponentUpdate()', nextProps, this.state)
    let shouldUpdate = true;

    // both false; don't take any more updates
    if(nextProps.goal === this.state.goal){
      shouldUpdate = false;
    }

    // received an goal from the table; okay lets update again
    if(nextProps.goalId !== this.state.goalId){
      this.setState({goalId: nextProps.goalId})
      
      if(nextProps.goal){
        this.setState({goal: nextProps.goal})     
        this.setState({form: this.dehydrateFhirResource(nextProps.goal)})       
      }
      shouldUpdate = true;
    }
 
    return shouldUpdate;
  }
  getMeteorData() {
    let data = {
      goalId: this.props.goalId,
      goal: false,
      form: this.state.form
    };

    if(this.props.goal){
      data.goal = this.props.goal;
    }

    return data;
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('GoalDetail.render()', this.state)
    let formData = this.state.form;

    return (
      <div id={this.props.id} className="goalDetail">
        <CardText>
          <TextField
            id='descriptionInput'
            ref='description'
            name='description'
            floatingLabelText='Description'
            hintText='Quit Smoking'
            value={ get(formData, 'description', '') }
            onChange={ this.changeState.bind(this, 'description')}
            floatingLabelFixed={true}
            fullWidth
            /><br/>
          <TextField
            id='priorityInput'
            ref='priority'
            name='priority'
            floatingLabelText='Priority'
            value={ get(formData, 'priority', '') }
            onChange={ this.changeState.bind(this, 'priority')}
            hintText='high | medium |low'
            floatingLabelFixed={true}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={ get(formData, 'status', '')}
            onChange={ this.changeState.bind(this, 'status')}
            hintText='proposed | planned | accepted | rejected | in-progress | achieved | sustaining | on-hold | cancelled'
            floatingLabelFixed={true}
            fullWidth
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.state.goalId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(goalId){
    if (goalId) {
      return (
        <div>
          <RaisedButton id="updateGoalButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton id="deleteGoalButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveGoalButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }
  componentDidUpdate(props){
    if(process.env.NODE_ENV === "test") console.log('GoalDetail.componentDidUpdate()', props, this.state)
  }
  updateFormData(formData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("GoalDetail.updateFormData", formData, field, textValue);

    switch (field) {
      case "description":
        set(formData, 'description', textValue)
        break;
      case "priority":
        set(formData, 'priority', textValue)
        break;        
      case "status":
        set(formData, 'status', textValue)
        break;
      default:
    }

    if(process.env.NODE_ENV === "test") console.log("formData", formData);
    return formData;
  }
  updateGoal(goalData, field, textValue){
    if(process.env.NODE_ENV === "test") console.log("GoalDetail.updateDevice", goalData, field, textValue);

    switch (field) {
      case "description":
        set(goalData, 'description', textValue)
        break;
      case "priority":
        set(goalData, 'priority', textValue)
        break;        
      case "status":
        set(goalData, 'status', textValue)
        break;    
    }
    return goalData;
  }

  changeState(field, event, textValue){
    if(process.env.NODE_ENV === "test") console.log("   ");
    if(process.env.NODE_ENV === "test") console.log("GoalDetail.changeState", field, textValue);
    if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

    let formData = Object.assign({}, this.state.form);
    let goalData = Object.assign({}, this.state.goal);

    formData = this.updateFormData(formData, field, textValue);
    goalData = this.updateGoal(goalData, field, textValue);

    if(process.env.NODE_ENV === "test") console.log("goalData", goalData);
    if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({goal: goalData})
    this.setState({form: formData})
  }

  handleSaveButton(){
    if(process.env.NODE_ENV === "test") console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&')
    console.log('Saving a new Goal...', this.state)

    let self = this;
    let fhirGoalData = Object.assign({}, this.state.goal);

    if(process.env.NODE_ENV === "test") console.log('fhirGoalData', fhirGoalData);


    let goalValidator = ConditionSchema.newContext();
    goalValidator.validate(fhirGoalData)

    console.log('IsValid: ', goalValidator.isValid())
    console.log('ValidationErrors: ', goalValidator.validationErrors());



    if (this.state.goalId) {
      if(process.env.NODE_ENV === "test") console.log("Updating Goal...");
      delete fhirGoalData._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      fhirGoalData.resourceType = 'Goal';

      Goals._collection.update(
        {_id: this.state.goalId}, {$set: fhirGoalData }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: self.data.goalId});
            Session.set('goalPageTabIndex', 1);
            Session.set('selectedGoal', false);
            Bert.alert('Goal updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new goal", fhirGoalData);

      Goals._collection.insert(fhirGoalData, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: result});
          Session.set('goalPageTabIndex', 1);
          Session.set('selectedGoal', false);
          Bert.alert('Goal added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('goalPageTabIndex', 1);
  }

  handleDeleteButton(){
    let self = this;
    Goals.remove({_id: this.state.goalId}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: self.data.goalId});
        Session.set('goalPageTabIndex', 1);
        Session.set('selectedGoal', false);
        Bert.alert('Goal removed!', 'success');
      }
    });
  }
}


GoalDetail.propTypes = {
  id: PropTypes.string,
  goalId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  goal: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
ReactMixin(GoalDetail.prototype, ReactMeteorData);