import { Favorite } from "./favorites.js";

export class FavoriteView extends Favorite {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button")

    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")

      this.add(value)
    }
  }

  createRow() {
    const tr = document.createElement("tr")

    tr.innerHTML = `
      <tr>
        <td class="user">
          <img src="https://github.com/agleymelo.png" alt="Agley's imagem profile" />
          <a href="http://github.com/agleymelo" target="_blank" rel="noopener noreferrer">
            <p>Agleylson Melo</p>
            <span>/agleymelo</span>
          </a>
        </td>
        <td class="repositories"></td>
        <td class="followers"></td>
        <td>
          <button class="remove">Remove</button>
        </td>
      </tr>
    `

    return tr
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector(".user img").src = `https://github.com/${user.login}.png`
      row.querySelector(".user img").alt = `${user.name}'s imagem profile`
      row.querySelector(".user a").href = `https://github.com/${user.lgoin}`

      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user span").textContent = `/${user.login}`

      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Are you sure you want to delete this line?")

        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
      this.checkUserLength()
    })
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach(tr => tr.remove())
  }
}