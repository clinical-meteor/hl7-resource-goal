import { 
  CssBaseline,
  Grid, 
  Container,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tab, 
  Tabs,
  Typography,
  Box
} from '@material-ui/core';
import { StyledCard, PageCanvas } from 'material-fhir-ui';

import GoalDetail from './GoalDetail';
import GoalsTable from './GoalsTable';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import PropTypes from 'prop-types';

//=============================================================================================================================================
// TABS

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

//=============================================================================================================================================
// COMPONENT


Session.setDefault('selectedGoalId', false);
Session.setDefault('fhirVersion', 'v1.0.2');

export class GoalsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('goalPageTabIndex'),
      goalSearchFilter: Session.get('goalSearchFilter'),
      selectedGoalId: Session.get('selectedGoalId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedGoal: false
    };

    if (Session.get('selectedGoalId')){
      data.selectedGoal = Goals.findOne({_id: Session.get('selectedGoalId')});
    } else {
      data.selectedGoal = false;
    }

    // data.style = Glass.blur(data.style);
    // data.style.appbar = Glass.darkroom(data.style.appbar);
    // data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('goalPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedGoalId', false);
    Session.set('goalUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('GoalsPage.render()');
    return (
      <div id='goalsPage'>
        <StyledCard height="auto" scrollable={true} margin={20} headerHeight={headerHeight} >          
          <CardContent>
            <Tabs id="goalsPageTabs" value={this.data.tabIndex} onChange={this.handleTabChange } aria-label="simple tabs example">
              <Tab label="Goals" value={0} />
              <Tab label="New" value={1} />
            </Tabs>
            <TabPanel className="goalListTab" >
              <GoalsTable />
            </TabPanel>
            <TabPanel className="goalDetailsTab">
              <GoalDetail 
                id='goalDetails' 
                fhirVersion={ this.data.fhirVersion }
                goal={ this.data.selectedGoal }
                goalId={ this.data.selectedGoalId } /> 
            </TabPanel> 
          </CardContent>
        </StyledCard>
      </div>
    );
  }
}

ReactMixin(GoalsPage.prototype, ReactMeteorData);

export default GoalsPage;