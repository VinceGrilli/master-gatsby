import calcultatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((selectedPizza) => selectedPizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid,
      price: formatMoney(calcultatePizzaPrice(pizza.price, item.size)),
    };
  });
}
