import { GithubUser } from './GithubUser.js'

export class Favorite {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  checkUserLength() {
    if (this.entries.length === 0) {
      document.querySelector(".empty-state").style.display = ""
    } else {
      document.querySelector(".empty-state").style.display = "none"
    }
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@git-fav:")) || []
  }

  save() {
    localStorage.setItem("@git-fav:", JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login = username)

      if (userExists) {
        throw new Error("User already exists")
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error("User not found")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredUsers = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredUsers

    this.update()
    this.save()
    this.checkUserLength()
  }
}