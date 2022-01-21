import journalApi from '@/api/journalApi'

export const loadEntries = async ( { commit } ) => {
    const { data } = await journalApi.get('/entries.json')
    const entries = []

    if( !data ) {
        commit('setEntries', entries)
        return
    }
    
    for(let id of Object.keys( data )){
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

export const updateEntry = async ( { commit }, entry) => {

    const {id, date, text, picture} = entry
    const entryToSend = {
        date, 
        text, 
        picture
    }

    await journalApi.put(`entries/${id}.json`, entryToSend)
    entryToSend.id = entry.id

    commit('updateEntry', { ...entryToSend })
}

export const createEntry = async ({ commit }, entry ) => {

    const { date, text, picture } = entry
    const entryToSend = {
        date, 
        text, 
        picture
    }

    const { data } = await journalApi.post(`entries.json`, entryToSend)
    entryToSend.id = data.name

    commit('addEntry', {...entryToSend})

    return entryToSend.id
}

export const deleteEntry = async ({ commit }, id ) => {
    await journalApi.delete(`entries/${id}.json`)
    commit('deleteEntry', id)
}