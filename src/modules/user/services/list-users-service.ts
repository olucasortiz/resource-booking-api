import { UserRepository } from "../repositories/user-repository.js"

export class ListUsersService {
  private userRepository = new UserRepository()

  async execute() {
    return this.userRepository.findMany()
  }
}