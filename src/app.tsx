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
  const [notes, setNotes] = useState<Note[]>([]) //Essa linha especifica ao react que este array terá o formato especificado na interface. Informar o formato, aqui, é obrigatório, caso contrátio... never[]

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(), //O math.random pode oferecer um mesmo número aleatório duas vezes. O crypto oferece strings aleatórias que não se repetm
      date: new Date(),
      content,
    }

    setNotes([ newNote, ...notes])
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6"> 
      <img src={logo} alt="NLW Expert"/>
      <form className="w-full">
        <input 
          type="text" 
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" /> 

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">

        
      <NewNoteCard onNoteCreated={onNoteCreated} />


    {notes.map(note =>{
      return <NoteCard key={note.id} note={note} />
    })}

      </div>
    </div>
  )
}

//export default App -> se fosse feita assim, o import não teria o nome do componente