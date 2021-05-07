import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import MeetingListView from 'src/views/meeting/MeetingListView';
import DashboardView from 'src/views/dashboard/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import CreateTopic from 'src/views/createTopic';
import CreateMeeting from 'src/views/createMeeting';
import TopicPool from 'src/views/topicPool';
import AttendMeetingView from 'src/views/attendMeeting/AttendMeetingtView';
import Room from 'src/views/attendMeeting/Room';
import ModifyMeeting from 'src/views/modifyMeeting';
import ModifyTopic from 'src/views/modifyTopic';
import MeetingHistoryList from 'src/views/meetingHistory';
import ForgotPassword from 'src/views/auth/ForgotPassword';
//const user = this.state.user
const routes = (loggedIn) => [
  {
    path: 'app',
    element: loggedIn ? <DashboardLayout /> : <Navigate to="/login"/>,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'meetings', element: <MeetingListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'createTopic', element: <CreateTopic/> },
      { path: 'createMeeting', element: <CreateMeeting/> },
      { path: 'topics', element: <TopicPool/> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'attendMeeting', element: <AttendMeetingView /> },
      { path: 'room/:roomID', element: <Room /> },
      { path: 'modifyMeeting/:meetingId', element: <ModifyMeeting /> },
      { path: 'modifyTopic/:topicId', element: <ModifyTopic /> },
      { path: 'meetingHistory', element: <MeetingHistoryList /> }
    ]
  },
  {
    path: '/',
    element: !loggedIn ?  <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/Login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'meetings',
    element: loggedIn ? <MainLayout  /> : <Navigate to="/login"/>,
    children: [
      { path: 'room/:roomID', element: <Room /> },
    ]

  }
  
];

export default routes;
