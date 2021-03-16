import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import MeetingListView from 'src/views/meeting/MeetingListView';
import DashboardView from 'src/views/dashboard/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
//import AttendMeetingView from 'src/views/attendMeeting/AttendMeetingtView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import CreateTopic from 'src/views/createTopic';
import CreateMeeting from 'src/views/createMeeting';
import TopicPool from 'src/views/topicPool';
import AttendMeetingView from 'src/views/attendMeeting/AttendMeetingtView';
import Room from 'src/views/attendMeeting/Room';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'meetings', element: <MeetingListView /> },
      { path: 'dashboard', element: <DashboardView /> },
     // { path: 'attendMeeting', element: <AttendMeetingView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'createTopic', element: <CreateTopic/> },
      { path: 'createMeeting', element: <CreateMeeting/> },
      { path: 'topics', element: <TopicPool/> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'attendMeeting', element: <AttendMeetingView /> },
      { path: 'room/:roomID', element: <Room /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/Login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
  
];

export default routes;
