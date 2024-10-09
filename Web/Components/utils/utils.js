export function mapComponents(
    data, // obj array
    component, // component ( each component is passed an object from the data array )
    additionalArgs=[] 
){
    return data.reduce((prev, cur)=> {
        return prev + component(cur, ...additionalArgs)
    }, "")
}
// Made this because using array.map to create components from an array of objects adds commas to each one.
// Since we're just converting to string/innerHTML thought this might be convenient. 
// Basically its just wrapping array.reduce to clean up the html markup in components.