import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/proxy/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching posts: ${error}`);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      <h1>User List</h1>

      {loading && <Spinner animation="border" />}

      <ListGroup>
        {users.map((user: any) => (
          <ListGroup.Item key={user.id}>
            <strong>{user.name}</strong> - {user.email} -{' '}
            {user.bio || 'No bio available'}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserListPage;
