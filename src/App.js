import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import TodoItems from "./components/TodoItems";
import Categories from "./components/Categories";
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
          <Route exact path="/" component={TodoItems} />
          <Route exact path="/todoitems" component={TodoItems} />
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