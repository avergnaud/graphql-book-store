import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';
import './App.css';

function App(props) {

  const { showTypeQuery, allBooksQuery } = props;

  if (showTypeQuery.loading || allBooksQuery.loading) {
    return <h1>Loading....</h1>;
  }

  const books = allBooksQuery.getAllBooks.filter(item => {
    if (showTypeQuery.show_type === 'BELOW_15') {
      return item.price < 15;
    }
    return item.price >= 15;
  });

  const changeShow = type => {
    props.mutate({
      variables: { show_type: type }
    });
  };

  return (
    <div>
      <h1>Bookstore</h1>
      {books.map(item => (
        <h3 key={item._id}>
          {item.title} - ${item.price}
        </h3>
      ))}
      <button onClick={() => changeShow('BELOW_15')}>Below $15</button>
      <button onClick={() => changeShow('ABOVE_15')}>Above $15</button>
    </div>
  );
}

const allBooksQuery = gql`
 query allBooksQuery {
   getAllBooks {
     _id
     author
      title
     price
   }
 }
`;

const showTypeQuery = gql`
 query showTypeQuery {
   show_type @client
 }
`;

const showTypeMutation = gql`
 mutation showTypeMutation($show_type: String!) {
   changeShowType(show_type: $show_type) @client {
     show_type
   }
 }
`;

export default flowRight(
  graphql(showTypeQuery, { name: 'showTypeQuery' }),
  graphql(allBooksQuery, { name: 'allBooksQuery' }),
  graphql(showTypeMutation)
)(App);