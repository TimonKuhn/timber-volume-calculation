# Imports für Rest API Schnittstelle
import uvicorn
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from calculation import calculation
# Imports für den Rest
import json



app = FastAPI()
origins = [
    "http://localhost:3000",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Data:
  def __init__(self):
    self.result = {"Anzahl" : "", "Volumen" : ""}

data = Data()

# Rest API
@app.post("/polyjson")
async def polyjson(info: Request):
    req_info = await info.json()
    new_polygon = json.loads(req_info['input'])
    print(f"polygon {new_polygon[0]}")
    data.result = calculation(new_polygon)
    #print(result)
    return 

    

@app.get("/result")
async def root() :
    return data.result
    print(f"mein resultat{data.result}")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
