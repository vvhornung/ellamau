export default function serialize(obj){
    return JSON.parse(JSON.stringify(obj))
}