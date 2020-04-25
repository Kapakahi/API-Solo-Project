const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,
      GraphQLString, 
      GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList
    } = graphql;
 
var movies = [
  {name: "Star Wars", genre: "scifi" , id:'1', directorID: "2"},
  {name: "Kill Bill", genre: "comedy" , id:'2', directorID: "1"},
  {name: "A-Team", genre: "action" , id:'3', directorID: "3"},
  {name: "Harry Potter", genre: "action" , id:'4', directorID: "3"},
  {name: "Crazy Asians", genre: "scifi" , id:'5', directorID: "2"},
  {name: "Karate Kid", genre: "comedy" , id:'6', directorID: "2"},
];

var directors = [
  {name: "Kari", age: 40, id: "1"},
  {name: "Stacey", age: 30, id: "2"},
  {name: "Mike", age: 43, id: "3"}
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type:GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director:{
      type: DirectorType,
      resolve(parent, args) {
        for (let direct of directors) {
          if (direct.id === parent.directorID) {
            return direct;
          }
        }
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type:GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, {directorID: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //code to get data from db / other source
       // return _.find(movies, {id: args.id})
       for (let movie of movies) {
         if (movie.id === args.id) {
           return movie;
         }
       }
      }
    },
    director:{
      type:DirectorType,
      args: {id: {type:GraphQLID}},
      resolve(parent, args) {
        for (let director of directors) {
          if (director.id === args.id) {
            return director;
          }
        }
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      }
    }



  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
}); 