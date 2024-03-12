import gql from 'graphql-tag'

export const GET_EMAILS = gql`
  query GetEmails {
    emails {
      id
      account
      pass
      tags
      assigned
      read
      method
    }
  }
`

export const CREATE_TODO = gql`
  mutation createTodo {
    createTodo(input: { text: "todo", userId: "1" }) {
      user {
        id
      }
      text
      done
    }
  }
`
