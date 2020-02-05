import { 
  Checkbox, 
  Table, 
  TableRow, 
  TableCell,
  TableBody
} from '@material-ui/core';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
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

  renderCheckboxsHeader(){
    if (!this.props.hideCheckbox) {
      return (
        <TableCell className="Checkbox"></TableCell>
      );
    }
  }
  renderCheckboxs(patientId ){
    if (!this.props.hideCheckbox) {
      return (
        <TableCell className="Checkbox">
            <Checkbox
              defaultChecked={true}
            />
          </TableCell>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <TableCell className="identifier">Identifier</TableCell>
      );
    }
  }
  renderIdentifier(goals ){
    if (!this.props.hideIdentifier) {
      
      return (
        <TableCell className='identifier'>{ get(goals, 'identifier[0].value') }</TableCell>       );
    }
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <TableCell className='actionIcons' style={{minWidth: '120px'}}>Actions</TableCell>
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
        <TableCell className='actionIcons' style={{minWidth: '120px', marginTop: '2px'}}>
          {/* <IoIosWarning style={warningStyle} onClick={this.showSecurityDialog.bind(this, goal)} /> */}
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, goal)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, goal._id)} />  
        </TableCell>
      );
    }
  } 
  rowClick(id){
    Session.set('goalsUpsert', false);
    Session.set('selectedGoalId', id);
    Session.set('goalPageTabIndex', 2);
  };
  removeRecord(_id){
    console.log('Remove goal ', _id)
    if(this.props.onRemoveRecord){
      this.props.onRemoveRecord(_id);
    }
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
        cursor: 'pointer'
      }
      if(get(this.data.goals[i], 'modifierExtension[0]')){
        rowStyle.color = "orange";
      }

      tableRows.push(
        <TableRow key={i} className="goalRow" style={rowStyle} onClick={ this.rowClick.bind('this', this.data.goals[i]._id)} >
          { this.renderCheckboxs(this.data.goals[i]) }
          { this.renderActionIcons(this.data.goals[i]) }
          { this.renderIdentifier(this.data.goals[i]) }

          <TableCell className='description'>{ newRow.description }</TableCell>
          <TableCell className='priority'>{ newRow.priority }</TableCell>
          <TableCell className='status'>{ newRow.status }</TableCell>
        </TableRow>
      )
    }

    return(
      <Table id='goalsTable' hover >
        <TableHeader>
          <TableRow>
            { this.renderCheckboxsHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            <TableCell className='description'>Description</TableCell>
            <TableCell className='priority'>Priority</TableCell>
            <TableCell className='status'>Status</TableCell>             
          </TableRow>
        </TableHeader>
        <TableBody>
          { tableRows }
        </TableBody>
      </Table>
    );
  }
}

GoalsTable.propTypes = {
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideCheckbox: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  onRemoveRecord: PropTypes.func
};
ReactMixin(GoalsTable.prototype, ReactMeteorData);
export default GoalsTable;