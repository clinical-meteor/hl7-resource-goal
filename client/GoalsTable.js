import { Card, CardActions, CardMedia, CardText, CardTitle, Toggle } from 'material-ui';
import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { IoIosWarning  } from 'react-icons/io';


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
              defaultT
              oggled={true}
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

      // let warningStyle = {
      //   marginLeft: '4px', 
      //   marginRight: '4px', 
      //   marginTop: '4px', 
      //   fontSize: '120%%',
      //   opacity: 0
      // }

      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }


      return (
        <td className='actionIcons' style={{minWidth: '120px', marginTop: '2px'}}>
          {/* <IoIosWarning style={warningStyle} onClick={this.showSecurityDialog.bind(this, goal)} /> */}
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, goal)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, goal._id)} />  
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
  showSecurityDialog(goal){
    console.log('showSecurityDialog', goal)

    Session.set('securityDialogResourceJson', goal);
    Session.set('securityDialogResourceType', 'Goal');
    Session.set('securityDialogResourceId', get(goal, '_id'));
    Session.set('securityDialogOpen', true);

    // alert(_id);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.goals.length; i++) {
      var newRow = {
        description: '',
        priority: '',
        status: ''
      };

      if(get(this.data.goals[i], 'description')){
        newRow.description = get(this.data.goals[i], 'description');
      }
      if(get(this.data.goals[i], 'priority.text')){
        newRow.priority = get(this.data.goals[i], 'priority.text');
      } else if(get(this.data.goals[i], 'priority')){
        newRow.priority = String(get(this.data.goals[i], 'priority'));
      }
      if(get(this.data.goals[i], 'status')){
        newRow.status = get(this.data.goals[i], 'status');
      }

      newRow.identifier = get(this.data.goals[i], 'identifier[0].value');

      let rowStyle = {
        color: 'black',
        cursor: 'pointer'
      }
      if(get(this.data.goals[i], 'modifierExtension[0].valueBoolean') === true){
        rowStyle.color = "orange";
      }

      tableRows.push(
        <tr key={i} className="goalRow" style={rowStyle} onClick={ this.rowClick.bind('this', this.data.goals[i]._id)} >
          { this.renderToggles(this.data.goals[i]) }
          { this.renderActionIcons(this.data.goals[i]) }
          { this.renderIdentifier(this.data.goals[i]) }

          <td className='description'>{ newRow.description }</td>
          <td className='priority'>{ newRow.priority }</td>
          <td className='status'>{ newRow.status }</td>
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