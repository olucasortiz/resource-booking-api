import { email } from "zod";
import { UserRepository } from "../repositories/user-repository.js";

export class CreateUserService{
    private usersRepository = new UserRepository()

    async execute(data:{name:string, email:string}){
        //const usersAlreadyExists = this.usersRepository.findByEmail(data.email)
        //if(usersAlreadyExists)
            //throw new Error("User already exists")
        return this.usersRepository.create(data)
    }
}