export const stringToBool = (message) =>{
    // converts spaces states from string to boolean
    const boolSpaceStates = message.map(val =>{
      if(val === '0'){
        return false
      }
      else{
        return true
      }
    })
    return boolSpaceStates
  }

  export const filterSpacesToUpdate = (spaces, message) =>{
    console.log('spaces:', spaces, 'message: ', message)
    // console.log(stringToBool(message))
    //modify the occupied field on the space instance 
    
    let spacesToBeUpdated = spaces?.filter((space, index)=> space.occupied != stringToBool(message)[index])
    
    const modified_spacesToBeUpdated = spacesToBeUpdated.map((space, index)=>{
        return {...space, occupied: stringToBool(message)[index + 1]}
    })
    
    const modified_spaces = spaces.map((space, index)=>{
        return {...space, occupied: stringToBool(message)[index]}
    })

    return {modified_spacesToBeUpdated, modified_spaces}
  }

// let res = stringToBool(['0', '0', '1'])
// console.log(filterSpacesToUpdate([{name: 'space 1', occupied: true,}, {name: 'space 2', occupied: false}, {name: 'space 3', occupied: false}], ['0', '1', '0']))