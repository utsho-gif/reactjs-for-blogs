import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, Button, Container, Card } from 'react-bootstrap';
import api from '../../utils/api';
import { toast } from 'react-toastify';

type FormInputs = {
  title: string;
  content: string;
  author: string;
};

const AdminDashboard: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await api.post('/posts', data);
      toast.success('Post created successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('Error creating post: Please try again.');
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Card
        className="shadow p-4"
        style={{ width: '30rem', borderRadius: '12px' }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h2>Post a blog</h2>
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register('title', { required: 'Title is required' })}
                isInvalid={!!errors.title}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter content"
                {...register('content', { required: 'Content is required' })}
                isInvalid={!!errors.content}
              />
              {errors.content && (
                <Form.Control.Feedback type="invalid">
                  {errors.content.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                {...register('author', { required: 'Author is required' })}
                isInvalid={!!errors.author}
              />
              {errors.author && (
                <Form.Control.Feedback type="invalid">
                  {errors.author.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Save Post
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
