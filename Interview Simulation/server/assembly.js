import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '5d257c23f1354d39938b51f98079c690',
})

const quesArray = []
let audioIndexValue = 0
const run = async (recordAudioValue) => {
  while(audioIndexValue<recordAudioValue){
    const transcript = await client.transcripts.transcribe({audio:`./${audioIndexValue}.wav`});
    
    audioIndexValue+=1
    quesArray.push({"questionText":transcript.text})
  }
  // console.log(quesArray);
  return quesArray

}

export {run}
