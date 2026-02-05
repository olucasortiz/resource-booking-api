import { ResourceRepository } from "../repositories/resource-repository.js"
export class ListResourceService{
    private resourceRepository = new ResourceRepository()

    async execute(){
        return this.resourceRepository.findMany()
    }
}