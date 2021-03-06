import { Container, Navbar } from "react-bootstrap";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar bg="info" expand="lg">
            <Container>
              <Navbar.Brand href="#home" className="text-white">
                React Shopping Cart
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {/* <Nav className="ms-auto menu">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
