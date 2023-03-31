import { Nav, Container, Form } from "react-bootstrap"

export default function PostNotFound() {
    return (
        <Container>
            <h1 className="my-3">Post not not found</h1>
            <Form>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            </Form>
        </Container>
        );
  }