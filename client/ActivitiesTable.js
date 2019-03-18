import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
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
  renderIdentifier(activity ){
    if (!this.props.hideIdentifier) {
      
      return (
        <td className='identifier'>{ get(activity, 'identifier[0].value') }</td>       );
    }
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{minWidth: '120px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(actionIcons ){
    if (!this.props.hideActionIcons) {
      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaLock style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaTags style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaCode style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaPuzzlePiece style={{marginLeft: '2px', marginRight: '2px'}} />          
        </td>
      );
    }
  } 

  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
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
      <tr className='activityRow' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.activity[i].reference.display) }>
        { this.renderToggles(this.data.activity[i]) }
        { this.renderActionIcons(this.data.activity[i]) }
        { this.renderIdentifier(this.data.activity[i]) }
        <td className="description">{this.data.activity[i].detail.description}</td>
        <td className="goal hidden-on-phone">{this.data.activity[i].reference.display}</td>
      </tr>);
    }


    return(
      <Table id="activitysTable" hover >
        <thead>
          <tr>
            { this.renderTogglesHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            <th className="description">Description</th>
            <th className="goal hidden-on-phone">Associated Goal</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
}


ActivitiesTable.propTypes = {
  data: PropTypes.array,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideToggle: PropTypes.bool,
  hideActionIcons: PropTypes.bool
};
ActivitiesTable.propTypes = {};
ReactMixin(ActivitiesTable.prototype, ReactMeteorData);
