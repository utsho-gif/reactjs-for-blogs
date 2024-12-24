import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import api from '../../utils/api';
import { toast } from 'react-toastify';

const BlogPostPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        toast.error(`Error fetching post: ${error}`);
      }
    };
    fetchPost();
  }, [id]);

  if (!post)
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-primary display-6 text-center mb-4">
                {post.title}
              </Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: '1.1rem' }}>
                {post.content}
              </Card.Text>
              <Card.Footer className="text-end text-secondary">
                <small>Author: {post.author}</small>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostPage;
