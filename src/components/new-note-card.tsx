import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true) //Quando se cria uma variável booleana, o nome dela deve indicar uma pergunta que pode ser respondida com sim ou não
  // O React não atualiza o estado da variável apenas por setar outro valor dela.
  //O useState retorna um array, no qual a 1ª posição diz respeito à variável
  const [isRecording, setIsRecording] = useState(false) //O parâmetro pode ser muitas coisas: valores booleanos, strings, etc
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

    if (content === ''){
      return
    }

    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true) //Mostra novamente o texto que pergunta ao usuário se ele quer digitar ou gravar um áudio para uma nova nota

    toast.success('Nota criada com sucesso!')
  } //Será disparada quando o usuário fizer o submit do form (textarea)

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvaliable = 'SpeechRecognition' in window 
    || 'webkitSpeechRecogntion' in window

    if(!isSpeechRecognitionAPIAvaliable){
      alert('Infelizmente, seu navegador não suporta o recurso de reconhecimento de fala!')

      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    
    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true //Para não parar de gravar até apertar o botão
    speechRecognition.maxAlternatives = 1 //A API irá selecionar apenas uma palavra similar para substituir um termo que não pode ter sido compreendido corretamente por ela
    speechRecognition.interimResults = true //Transcrição em tempo real

    speechRecognition.onresult = (event) => { //Vai chamar a API toda vez que ela "ouvir" algo
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if(speechRecognition != null){
      speechRecognition.stop()
    }
  }

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
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline"> gravando uma nota </button> em áudio ou, se preferir, <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline"> utilize apenas texto</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 flex-1 bg-transparent resize-none outline-none"
                  onChange={handleContentChanged}
                  value={content} />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )
            }


          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}