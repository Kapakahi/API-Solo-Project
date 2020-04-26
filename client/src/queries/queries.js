import { gql } from 'apollo-boost';

const getMoviesQuery = gql`
{
  movies {
    name
    id
  }
}
`;

const getDirectorsQuery = gql`
  {
    directors {
      name
      id
    }
  }
`
const addMovieMutation = gql`
  mutation AddMovie($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId){
      name
      id
    }
  }
`
const getMovieQuery = gql`
  query GetMovie($id: ID) {
    movie(id: $id){
      id
      name
      genre
      director {
        id
        name
        age
        movies{
          name
          id
        }
      }
    }
  }
`
export {getDirectorsQuery, getMoviesQuery, addMovieMutation, getMovieQuery};