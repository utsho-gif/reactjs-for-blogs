import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Post {
  _id: any;
  id: string;
  title: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container
      fluid
      className="bg-light vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 fw-bold text-primary">Blog Posts</h1>
          <p className="text-muted">Explore our latest updates and insights</p>
        </Col>
      </Row>
      <Row>
        <Col md={8} lg={12}>
          <Card className="shadow-lg">
            <Card.Body>
              <ListGroup variant="flush">
                {posts.map((post) => (
                  <ListGroup.Item
                    key={post.id}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <span className="text-secondary">
                      {post._id}. &nbsp;&nbsp;&nbsp;
                    </span>
                    <Link
                      to={`/post/${post?._id}`}
                      className="text-decoration-none text-primary fw-bold"
                    >
                      {post.title}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
