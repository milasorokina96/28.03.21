const menu = {
    burger: [
        {
            name: '🍔',
            time: 700
        },
        {
            name: '🍟',
            time: 750
        },
    ],
    hotDog: [
        {
            name: '🌭',
            time: 300
        },
        {
            name: '🍺',
            time: 500
        },
    ],
    pizza: [
        {
            name: '🍕',
            time: 200
        },
        {
            name: '🥃',
            time: 250
        },
    ],
      
};


const order = async (food) => {
    const cookFood = ({ name, time }) =>
      new Promise((resolve, reject) => {
        const condition = +Math.random().toFixed();
        setTimeout(() => {
          condition ? resolve(name) : reject(name);
        }, time);
      });
  
    const completeOrder = await Promise.allSettled(food.map(cookFood));
  
    if (completeOrder.every((x) => x.status === "fulfilled")) {
      return completeOrder;
    } else {
      throw new Error("Something went wrong...1");
    }
  };
  
  const checkOrders = async (orders) => {
    const completeOrders = await Promise.allSettled(orders);
    const ordersStatistic = completeOrders.reduce((a, x) => {
      a[x.status] || (a[x.status] = []);
      a[x.status].push(x);
      return a;
    }, {});
  
    if (ordersStatistic.fulfilled?.length > 2) {
      return ordersStatistic.fulfilled.map((order) =>
        order.value.map((x) => x.value)
      );
    } else {
      throw new Error("Something went wrong...2");
    }
  };
  
  checkOrders([order(menu.burger), order(menu.hotDog), order(menu.pizza)])
    .then(console.log)
    .catch((e) => console.log(e.message));

