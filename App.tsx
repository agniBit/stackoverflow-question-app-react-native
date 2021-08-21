import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Dashboard from './pages/mainPage';
import ShowQuestionDetails from './pages/questionDetail';


const RootStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    ShowQuestionDetails: ShowQuestionDetails,
  },
  {
    initialRouteName: "Dashboard"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

