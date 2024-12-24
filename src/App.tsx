import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/home/HomePage';
import BlogPostPage from './pages/blog/BlogPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import { Container, Nav, Navbar } from 'react-bootstrap';
import UserCreatePage from './pages/users/UserCreatePage';
import UserListPage from './pages/users/UserListPage';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin">Dashboard</Nav.Link>
            <Nav.Link href="/user-create">User Create</Nav.Link>
            <Nav.Link href="/users">All User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/user-create" element={<UserCreatePage />} />
          <Route path="/users" element={<UserListPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
