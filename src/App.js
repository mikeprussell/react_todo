import "./App.css";
import Navigation from "./components/Navigation";
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import TodoItems from "./components/TodoItems/TodoItems";
import Categories from "./components/Categories/Categories";
import Login from "./components/Auth/Login";
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navigation />
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={TodoItems} />
          <PrivateRoute exact path="/todoitems" component={TodoItems} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;