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
  // Тут мы готовим каждое блюдо
    const cookFood = ({ name, time }) =>
    // Для этого создаем промис, который выполняется успешно или не в зависимости от условия
      new Promise((resolve, reject) => {
        const condition = +Math.random().toFixed();
        setTimeout(() => {
          condition ? resolve(name) : reject(name);
        }, time);
      });

    // Тут мы ожидаем окончания приготовления всех блюд
    // allSattled возвращает объект со статусом fulfilled или rejected и значением
    const completeOrder = await Promise.allSettled(food.map(cookFood));

    // Тут проверяем, что все блюда готовы
    if (completeOrder.every((x) => x.status === "fulfilled")) {
      return completeOrder;
    } else {
      throw new Error("Something went wrong...1");
    }
  };

    const checkOrders = async (orders) => {
      // Тут мы ждем все заказы и ожидаем их выполнения
      const completeOrders = await Promise.allSettled(orders);
    
      // Создаем объект, чтоб сразу разделить выполненные и нет
      const ordersStatistic = completeOrders.reduce((a, x) => {
        a[x.status] || (a[x.status] = []);
        a[x.status].push(x);
        return a;
      }, {});
    
      // Проверяем сколько выполненно. Если нужны все, то выше reduce заменяем на every
      if (ordersStatistic.fulfilled?.length > 2) {
        return ordersStatistic.fulfilled.map((order) =>
          order.value.map((x) => x.value)
        );
      } else {
        throw new Error("Something went wrong...");
      }
    };
    
    checkOrders([order(menu.burger), order(menu.hotDog), order(menu.pizza)])
      .then(console.log)
      .catch((e) => console.log(e.message));