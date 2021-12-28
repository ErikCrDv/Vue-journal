export default ( ) => ({ 
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum numquam, sunt nam quidem et. Esse dolore ducimus provident quaerat, soluta magni est incidunt odit quae veritatis fugit corporis aliquid?',
            picture: null
        },
        {
            id: new Date().getTime() + 100,
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum numquam, sunt nam quidem et. Esse dolore ducimus provident quaerat, soluta magni est incidunt odit quae veritatis fugit corporis aliquid?',
            picture: null
        },
        {
            id: new Date().getTime() + 200,
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum numquam, sunt nam quidem et. Esse dolore ducimus provident quaerat, soluta magni est incidunt odit quae veritatis fugit corporis aliquid?',
            picture: null
        }
    ]
 })