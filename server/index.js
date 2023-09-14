import cors from "cors"
import express, { text } from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express() //iniciando express através da variável "app" (const)
app.use(express.json())
app.use(cors()) //usando o cors para habilitar a conexão do FE com BE

app.get("/summary/:id", async (request, response) => {
  try{
  await download(request.params.id)
  const audioConverted = await convert()
  const result = await transcribe(audioConverted)

  return response.json({ result })
  } catch (error){
    console.log(error)
    return response.json({error})
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333")) //iniciar o servidor para ficar "escutando" as requisições na porta 3333

//Para iniciar o servidor no terminal: "node server/index.js" (caminho do arquivo)
