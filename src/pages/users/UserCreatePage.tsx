import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from '../../utils/api';
import { toast } from 'react-toastify';

interface UserFormData {
  name: string;
  email: string;
  bio: string;
}

const UserCreatePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      await api.post('/posts/proxy/users', data);
      toast.success('User created successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('Error creating post: Please try again.');
    }
  };

  return (
    <Container>
      <h1>Create User</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register('name', { required: 'Name is required' })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Invalid email address',
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter bio"
            {...register('bio', { required: 'Bio is required' })}
            isInvalid={!!errors.bio}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
    </Container>
  );
};

export default UserCreatePage;
