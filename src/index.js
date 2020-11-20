import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const LAUNCH_DATA = gql`
  query GetLaunchData {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function LaunchData() {
  const { loading, error, data } = useQuery(LAUNCH_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map((launch) => (
    <div key={launch.links.video_link}>
      <h3>Rocket Name: {launch.rocket.rocket_name}</h3>
      <p>Launch Date: {launch.launch_date_utc}</p>
      <p>Successful Launch: {launch.launch_success ? "Yes" : "No"}</p>
      <p>Video: {launch.links.video_link}</p>
      <p>Details: {launch.details ? launch.details : "No details"}</p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <LaunchData />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
