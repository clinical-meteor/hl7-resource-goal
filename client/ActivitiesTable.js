
import { 
  Checkbox, 
  Table, 
  TableRow, 
  TableCell,
  TableBody
} from '@material-ui/core';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import PropTypes from 'prop-types';
import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'
import { get } from 'lodash';

Session.setDefault('deselectedActivities', []);

export default class ActivitiesTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        }
      },
      selected: [],
      activity:[]
    };

    // // the following assumes that we only have a single CarePlan record in the database
    // if (CarePlans.find({'identifier.value':'alcohol-treatment-template'}).count() > 0) {
    //   let carePlanTemplate = CarePlans.find({'identifier.value':'alcohol-treatment-template'}).fetch()[0];
    //   //console.log("carePlanTemplate", carePlanTemplate);
    //   if (carePlanTemplate ) {
    //     data.activity = carePlanTemplate.activity;
    //   }
    // } else {
      data.activity = [{
        detail: {
          description: '10,000 steps per day'
        },
        reference: {
          display: ''
        }
      }, {
        detail: {
          description: 'Cycle to work 30 mins.'
        },
        reference: {
          display: ''
        }
      }]
    // }

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.WebkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    //console.log("data", data);

    return data;
  }
  renderCheckboxHeader(){
    if (!this.props.hideCheckbox) {
      return (
        <TableCell className="toggle"></TableCell>
      );
    }
  }
  renderCheckbox(patientId ){
    if (!this.props.hideCheckbox) {
      return (
        <TableCell className="toggle" style={{width: '10px'}} >
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
  renderIdentifier(activity ){
    if (!this.props.hideIdentifier) {
      
      return (
        <TableCell className='identifier'>{ get(activity, 'identifier[0].value') }</TableCell>       );
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

      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <TableCell className='actionIcons' style={{minWidth: '120px', marginTop: '2px'}}>
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, goal)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, goal._id)} />  
        </TableCell>
      );
    }
  } 

  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }
  removeRecord(_id){
    console.log('Remove activity ', _id)
    if(this.props.onRemoveRecord){
      this.props.onRemoveRecord(_id);
    }
  }
  showSecurityDialog(activity){
    console.log('showSecurityDialog', activity)

    // Session.set('securityDialogResourceJson', Activities.findOne(get(activity, '_id')));
    // Session.set('securityDialogResourceType', 'Activities');
    // Session.set('securityDialogResourceId', get(activity, '_id'));
    // Session.set('securityDialogOpen', true);
  }
  rowClick(display){
    let deselectedActivities = Session.get('deselectedActivities');

    if (deselectedActivities.includes(display)) {
      deselectedActivities.splice(deselectedActivities.indexOf(display), 1);
    } else {
      deselectedActivities.push(display);
    }

    if(process.env.NODE_ENV === "test") console.log("deselectedActivities", deselectedActivities);

    Session.set('deselectedActivities', deselectedActivities);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.activity.length; i++) {
      tableRows.push(
      <TableRow className='activityRow' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.activity[i].reference.display) }>
        { this.renderCheckbox(this.data.activity[i]) }
        { this.renderActionIcons(this.data.activity[i]) }
        { this.renderIdentifier(this.data.activity[i]) }
        <TableCell className="description">{this.data.activity[i].detail.description}</TableCell>        
        <TableCell className="goal hidden-on-phone">{this.data.activity[i].reference.display}</TableCell>
      </TableRow>);
    }


    return(
      <Table id="activitysTable" hover >
        <TableHead>
          <TableRow>
            { this.renderCheckboxHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            <TableCell className="description">Description</TableCell>
            <TableCell className="goal hidden-on-phone">Associated Goal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRows }
        </TableBody>
      </Table>

    );
  }
}


ActivitiesTable.propTypes = {
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideCheckbox: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  onRemoveRecord: PropTypes.func
};
ActivitiesTable.propTypes = {};
ReactMixin(ActivitiesTable.prototype, ReactMeteorData);
