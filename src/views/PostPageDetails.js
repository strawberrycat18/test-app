import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { deleteDoc, doc, getDoc } from "firebase/firestore"

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deletePost(id) {
    try {
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
    } catch {
      navigate("/postnotfound");
    };
  }

  async function getPost(id) {
    console.log(id)
    try{
          const postDocument = await getDoc(doc(db, "posts", id));
          const post = postDocument.data();
          setCaption(post.caption);
          setImage(post.image);
          setUsername(post.username);
        } catch {
            navigate("/postnotfound");
            };
    }

  useEffect(() => {
    console.log(user)
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);
  console.log(username)
  if (auth.currentUser.email === username){
    return (
      <>
        <Navbar variant="light" bg="light">
          <Container>
            <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
            <Nav>
              <Nav.Link href="/add">New Post</Nav.Link>
              <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Row style={{ marginTop: "2rem" }}>
            <Col md="6">
              <Image src={image} style={{ width: "100%" }} />
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text>{caption}</Card.Text>
                  <Card.Text>{username}</Card.Text>
                  <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                  <Card.Link
                    onClick={() => deletePost(id)}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );} else{
      return (
        <>
          <Navbar variant="light" bg="light">
            <Container>
              <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
              <Nav>
                <Nav.Link href="/add">New Post</Nav.Link>
                <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container>
            <Row style={{ marginTop: "2rem" }}>
              <Col md="6">
                <Image src={image} style={{ width: "100%" }} />
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Text>{caption}</Card.Text>
                    <Card.Text>{username}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    )};
}