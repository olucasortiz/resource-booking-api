import { ResourceRepository } from "../repositories/ResourceRepository.js"
export class CreateResourceService{
    private resourceRepository = new ResourceRepository()

    async execute(data:{name:string, type:string}){
        return this.resourceRepository.create(data)
    }
}