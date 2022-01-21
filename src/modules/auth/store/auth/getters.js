// export const myGetter = ( state ) => { return state }

export const currentState = ( state ) => state.status 
export const username = ( state ) => state.user?.name || ''
