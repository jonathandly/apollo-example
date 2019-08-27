import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io'
});

function ExchangeRates() {
    const { loading, error, data } = useQuery(gql`
        {
            rates(currency: "USD") {
                currency
                rate
            }
        }
    `);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>;

    return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
            <p>
                {currency}: {rate}
            </p>
        </div>
    ));
}

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
)



ReactDOM.render(<App />, document.getElementById('root'));
