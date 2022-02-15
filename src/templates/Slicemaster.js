import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SlicemasterPage({ data }) {
  const { person } = data;
  console.log(data);
  return (
    <SlicemasterGrid>
      <Img fluid={person.image.asset.fluid} alt={person.name} />
      <div>
        <h2 className="mark">{person.name}</h2>
        <p>{person.description}</p>
      </div>
    </SlicemasterGrid>
  );
}

// this needs to be dynamic based on the slug passed through context in gatsby-node
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
