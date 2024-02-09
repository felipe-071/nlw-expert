import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps{
  onNoteCreated: (content: string) => void
} 

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true) //Quando se cria uma variável booleana, o nome dela deve indicar uma pergunta que pode ser respondida com sim ou não
  // O React não atualiza o estado da variável apenas por setar outro valor dela.
  //O useState retorna um array, no qual a 1ª posição diz respeito à variável
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value) //O event.target.value define que o conteúdo de content será alterado de acordo com o conteúdo inserido pelo usuário

    if (event.target.value === '') { //O value só pode ser usado quando usa-se o generic do TS
      setShouldShowOnboarding(true)
    }

  } //Toda função que é disparada em um evento no JS tem um event como parâmetro. No TS, ele deve ser tipado. Por isso event: ChangeEvent (ou MouseEvent no caso do onClick)

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true) //Mostra novamente o texto que pergunta ao usuário se ele quer digitar ou gravar um áudio para uma nova nota

    toast.success('Nota criada com sucesso!')
  } //Será disparada quando o usuário fizer o submit do form (textarea)
  return (

    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
        <span
          className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button className="font-medium text-lime-400 hover:underline"> gravando uma nota </button> em áudio ou, se preferir, <button onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline"> utilize apenas texto</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 flex-1 bg-transparent resize-none outline-none"
                  onChange={handleContentChanged}
                  value={content} />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}