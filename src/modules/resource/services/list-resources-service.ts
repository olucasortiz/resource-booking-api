import { ResourceRepository } from "../repositories/ResourceRepository.js"
export class ListResourceService{
    private resourceRepository = new ResourceRepository()

    async execute(){
        return this.resourceRepository.findMany()
    }
}