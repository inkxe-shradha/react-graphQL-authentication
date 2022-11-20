import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
    }
  }
`;
export const singUpMutation = gql`
  mutation Login($email: String, $password: String) {
    signup(email: $email, password: $password) {
      email
    }
  }
`;
