import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    signupUser(email: $email, username: $username, password: $password) {
      token
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers {
      _id
      username
      email
      password
      avatar
      joinDate
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      password
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;
