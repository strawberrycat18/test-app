import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
// import { db } from "../firebase";

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

   async function getAllPosts() {
      try {    
      const query = await getDocs(collection(db, "posts"));
      const posts = query.docs.map((doc) => {
        return { id: doc.id, ...doc.data()};
      });
      setPosts(posts);
    } catch {
      navigate("/postnotfound");
    };
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getAllPosts();
  }, [navigate, user, loading]);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };
console.log(user)
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
      <Container>Welcome to Tinkergram , {user?.email}!</Container>
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}

function ImageSquare({ post }) {
  const { image, id } = post;
  return (
    <>
    <Link
      to={`post/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
    {/* <text>{caption}</text> */}
    {/* <Button href={`/update/${id}`} 
        style={{
          objectFit: "cover",
          width:"18rem",
          height:"2rem",
          marginTop:"1rem",
          marginBottom:"2rem"}}>
        Edit
    </Button> */}
    </>
  );
}