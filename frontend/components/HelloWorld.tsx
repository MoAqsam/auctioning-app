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
      <>
        <p>Loading ...</p>
      </>
    );
  return (
    <>
      <h1>{data.helloworld.message}</h1>
    </>
  );
};

export default Hello;
