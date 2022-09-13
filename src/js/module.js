export class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = 31;
  }
  greet() {
    console.log(`hi ${this.firstName} ${this.lastName}`);
  }

  static getAge() {
    return this.age;
  }
}

// const getSomething = async function () {
//   try {
//     const res = await fetch(
//       'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
//     );
//     const data = await res.json();
//     // console.log(data);
//     if (!res.ok) throw new Error(data.message);
//     let { recipe } = data.data;
//     // console.log(recipe);
//     recipe = {
//       id: recipe.id,
//       url: recipe.source_url,
//       ingredients: recipe.ingredients,
//     };

//     const ingHtml = recipe.ingredients
//       .map(i => {
//         return `<li>${i.quantity} ${i.unit} ${i.description}</li>`;
//       })
//       .join('');
//     list.insertAdjacentHTML('beforeend', ingHtml);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
// const person1 = new Person('aaron', 'de leon');
// console.log(person1);
// person1.greet();
