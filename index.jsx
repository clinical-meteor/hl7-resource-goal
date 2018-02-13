

import GoalsPage from './client/GoalsPage';
import GoalsTable from './client/GoalsTable';
import { Goal, Goals, GoalSchema } from './lib/Goals';

var DynamicRoutes = [{
  'name': 'GoalsPage',
  'path': '/goals',
  'component': GoalsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Goals',
  'to': '/goals',
  'href': '/goals'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  GoalsPage,
  GoalsTable,

  Goal,
  Goals,
  GoalSchema
};


