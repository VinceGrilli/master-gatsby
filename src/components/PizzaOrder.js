import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calcultatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        // match singleOrder pizza in state to pizzas from query passed down through props
        const pizza = pizzas.find(
          (singlePizza) => singlePizza.id === singleOrder.id
        );
        return (
          <MenuItemStyles key={singleOrder.id}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calcultatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                className="remove"
                type="button"
                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
