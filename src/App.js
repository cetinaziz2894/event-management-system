import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import EventDetailPage from './components/EventDetailPage';
import EventPage from './components/EventPage';
import LoginPage from './components/LoginPage';
import ParticipantListPage from './components/ParticipantListPage';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './components/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div className="app">
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact  path="/login">
                <LoginPage />
              </Route>
              <Route exact  path="/register">
                <RegisterPage />
              </Route>
              <PrivateRoute  path="/event-detail">
                <EventDetailPage />
              </PrivateRoute >
              <PrivateRoute  path="/participant-list">
                <ParticipantListPage />
              </PrivateRoute >
              <PrivateRoute  exact  path="/">
                <EventPage />
              </PrivateRoute >
            </Switch>
          </AuthProvider>
      </Router>
    </div>
   );
}

export default App;
