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
