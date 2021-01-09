import { gql, useQuery } from '@apollo/client';

const GET_GREETING = gql`
  query {
    helloworld {
      message
    }
  }
`;

const Hello: React.FC = () => {
  const { loading, data } = useQuery(GET_GREETING);

  if (loading)
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  return (
    <div>
      <h1>{data.helloworld.message}</h1>
    </div>
  );
};

export default Hello;
