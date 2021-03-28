class StarWarsData {
  state = {
    starships: [],
    url: "https://swapi.dev/api/starships",
    films: new Map(),
  };

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  async loadStarships() {
    const { results: starships, next: url } = await this.fetchData(
      this.state.url
    );

    this.state.starships = [...this.state.starships, ...starships];
    this.state.url = url;

    return this.state;
  }

  async loadFilms(target) {
    const filmsLink = this.state.starships.find(
      (x) => x.name === target.innerText
    ).films;

    const data = await Promise.all(
      filmsLink.map(async (link) => {
        if (this.state.films.has(link)) {
          return this.state.films.get(link);
        }

        const film = await this.fetchData(link);
        this.state.films.set(link, film.title);

        return film.title;
      })
    );

    return data;
  }
}

class List {
  constructor(model, loadMoreButton, listBox) {
    this.loadMoreButton = loadMoreButton;
    this.listBox = listBox;
    this.model = model;

    this.loadMore();
  }

  loadMore() {
    this.loadMoreButton.addEventListener("click", async () => {
      if (this.model.state.url) {
        const { starships, url } = await this.model.loadStarships();

        this.listBox.innerHTML = "";
        this.renderList("starships-list", this.listBox, starships, "name");

        if (!url) {
          this.loadMoreButton.setAttribute("disabled", true);
        }
      }
    });
  }

  renderList(listClassName, parentElement, data, property) {
    const ul = document.createElement("ul");
    ul.classList.add(listClassName);

    data.forEach((x) => {
      const li = document.createElement("li");
      li.classList.add(listClassName + "__item");
      li.textContent = property ? x[property] : x;

      ul.append(li);
    });

    parentElement.append(ul);
    this.showInnerList(parentElement, listClassName);
  }

  showInnerList(element, parent) {
    element.addEventListener("click", async ({ target }) => {
      if (target.closest("." + parent + "__item")) {
        const films = await this.model.loadFilms(target);

        this.renderList("inner-list", target, films);
      }
    });
  }
}

new List(
  new StarWarsData(),
  document.querySelector(".load-more"),
  document.querySelector(".box")
);
