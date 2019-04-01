import { Card, CardActions, CardMedia, CardText, CardTitle, Toggle } from 'material-ui';
import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';
import PropTypes from 'prop-types';

export class GoalsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      goals: []
    }
    
    if(Goals.find().count() > 0){
      data.goals = Goals.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };

  renderTogglesHeader(){
    if (!this.props.hideToggle) {
      return (
        <th className="toggle">Toggle</th>
      );
    }
  }
  renderToggles(patientId ){
    if (!this.props.hideToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier">Identifier</th>
      );
    }
  }
  renderIdentifier(goals ){
    if (!this.props.hideIdentifier) {
      
      return (
        <td className='identifier'>{ get(goals, 'identifier[0].value') }</td>       );
    }
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{minWidth: '120px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(goal){
    if (!this.props.hideActionIcons) {
      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaLock style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaTags style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaCode style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaPuzzlePiece style={{marginLeft: '2px', marginRight: '2px'}} />        
          <GoTrashcan style={{marginLeft: '2px', marginRight: '2px'}} onClick={this.removeRecord.bind(this, goal._id)} />
  
        </td>
      );
    }
  } 
  rowClick(id){
    Session.set('goalsUpsert', false);
    Session.set('selectedGoalId', id);
    Session.set('goalPageTabIndex', 2);
  };
  removeRecord(_id){
    console.log('removeRecord', _id)
    Goals._collection.remove({_id: _id})
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.goals.length; i++) {
      var newRow = {
        description: '',
        priority: '',
        status: ''
      };

      if(this.data.goals[i].description){
        newRow.description = get(this.data.goals[i], 'description');
      }
      if(this.data.goals[i].priority){
        newRow.priority = get(this.data.goals[i], 'priority.text');
      }
      if(this.data.goals[i].status){
        newRow.status = get(this.data.goals[i], 'status');
      }

      newRow.identifier = get(this.data.goals[i], 'identifier[0].value');

      tableRows.push(
        <tr key={i} className="goalRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.goals[i]._id)} >
          { this.renderToggles(this.data.goals[i]) }
          { this.renderActionIcons(this.data.goals[i]) }
          { this.renderIdentifier(this.data.goals[i]) }

          <td className='description'>{ newRow.description }</td>
          <td className='priority'>{ newRow.priority }</td>
          <td className='statusReason'>{ newRow.status }</td>
        </tr>
      )
    }

    return(
      <Table id='goalsTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            <th className='description'>Description</th>
            <th className='priority'>Priority</th>
            <th className='status'>Status</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

GoalsTable.propTypes = {
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideToggle: PropTypes.bool,
  hideActionIcons: PropTypes.bool
};
ReactMixin(GoalsTable.prototype, ReactMeteorData);
export default GoalsTable;