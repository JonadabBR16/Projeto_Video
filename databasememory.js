import { randomUUID } from "crypto"

export class DatabaseMemory{
    #videos = new Map()

    list(){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]
            
            return{
                id,
                ...data,//spread operator 

            }
        })
        
    }
    create(video){
        const videoId = randomUUID() //UUID Universal Unique ID
        
        this.#videos.set(videoId,video)
    }
    update(id,video){
        this.#videos.set(video)
    }
    delete(id){
        this.#videos.delete(id)
    }
}