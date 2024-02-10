import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card' 
import { ChangeEvent, FormEvent, useState } from 'react'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() { //O Diego gosta de fazer exports nomeados, como nesta linha
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() =>{
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage) //O parse é o contrário do stringify
    }

    return []
  }) //Essa linha especifica ao react que este array terá o formato especificado na interface. Informar o formato, aqui, é obrigatório, caso contrátio... never[]
//Sempre que a página for reiniciada, sempre seria "renderizado" um array vazio por conta da linha de cima


  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(), //O math.random pode oferecer um mesmo número aleatório duas vezes. O crypto oferece strings aleatórias que não se repetm
      date: new Date(),
      content,
    }

    const notesArray = [ newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray)) //O localStorage não aceita arrays, então é necessário converter para JSON
  
  //JSON = JavaScript Object Notation. É a representação em string de qualquer valor primitivo JS
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) //Eu vou procurar as notas cujo conteúdo inclui a palavra buscada
  : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6"> 
      <img src={logo} alt="NLW Expert"/>
      <form className="w-full">
        <input 
          type="text" 
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" /> 

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">

        
      <NewNoteCard onNoteCreated={onNoteCreated} />


    {filteredNotes.map(note =>{
      return <NoteCard key={note.id} note={note} />
    })}

      </div>
    </div>
  )
}

//export default App -> se fosse feita assim, o import não teria o nome do componente