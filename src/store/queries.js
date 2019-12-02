import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
    }
  }
`;
export const GET_POSTS_INFINITE = gql`
  query($limit: Int!, $skip: Int!) {
    getPostsInfinite(limit: $limit, skip: $skip) {
      _id
      title
      imageUrl
      description
      likes
      createdDate
      createdBy {
        username
        avatar
      }
      messages {
        _id
        messageBody
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      user {
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
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    signupUser(email: $email, username: $username, password: $password) {
      user {
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

export const CREATE_POST = gql`
  mutation(
    $title: String!
    $description: String!
    $imageUrl: String!
    $categories: [String!]!
    $creatorId: String!
    $createdDate: String!
  ) {
    addPost(
      title: $title
      description: $description
      imageUrl: $imageUrl
      categories: $categories
      creatorId: $creatorId
      createdDate: $createdDate
    ) {
      _id
      title
      description
      imageUrl
      categories
      createdDate
      createdBy {
        username
        avatar
      }
    }
  }
`;
