import * as Dialog from '@radix-ui/react-dialog' //Esta linha pega todas as exportações que o react-dialog faz e coloca dentro de um objeto Dialog
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

//Ex: Dialog.todosOsElementos

interface NoteCardProps{ //Aqui, cria-se uma interface com dados alteráveis e dinâmicos
    note: {
        date: Date
        content: string
    }
}

// export function NoteCard(props: NoteCardProps) { //O parâmetro da function faz a tipagem dos valores, ou seja, o notecard segue a estrutura definida na interface 
//     return (
//         <button className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
//           <span className="text-sm font-medium text-slate-300">
//             {props.note.date.toISOString()}
//           </span>
//             <p className="text-sm leading-6 text-slate-400">
//             {props.note.content} 
//           </p>

//           <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
//         </button>
//     )
// }

export function NoteCard({note}: NoteCardProps) { //Para tirar o props, basta desestruturar como nesta linha
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {note.date.toISOString()}
        </span>
          <p className="text-sm leading-6 text-slate-400">
          {note.content} 
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal> 
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
         <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
          <X  className="size-5"/>
          </Dialog.Close>

         <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
        </span>
          <p className="text-sm leading-6 text-slate-400">
          {note.content} 
        </p>
          </div>

          <button 
          type="button" 
          className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar esta nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
      </Dialog.Root>
  )
}

// O Dialog.Trigger substitui o elemento que desejamoos que abra o modal, neste caso
// o Button

// O Dialog.Portal transfere o conteúdo para a raiz da aplicação
// O inset no CSS especifica as 4 propriedades de position de uma só vez