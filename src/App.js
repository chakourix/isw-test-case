import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TeamMembers from "./view/TeamMembers";
import Member from "./view/Member";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TeamMembers />,
    },
    {
      path: "/member/:id",
      element: <Member />,
    },
    {
      path: "/member",
      element: <Member />,
    },
  ]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <RouterProvider router={router} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
