import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the url for this new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // pass data from this template to single page
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // what is the url for this new page
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      // pass data from this template to single page
      context: {
        topping: topping.name,
        // TODO Regex for topping
      },
    });
    console.log(topping.name);
  });
}

export async function createPages(params) {
  // create pages dynamiclly
  // wait for all promises to be called before finishing this function...
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
}
