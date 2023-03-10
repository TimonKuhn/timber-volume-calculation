# Imports für Rest API Schnittstelle
import uvicorn
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from calculation import calculation
# Imports für den Rest
import json

result = {
          "Anzahl": "n",
          "Volumen": "n"
    }


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
# Rest API
@app.post("/polyjson")
async def polyjson(info: Request):
    req_info = await info.json()
    new_polygon = json.loads(req_info['input'])
    print(f"polygon {new_polygon[0]}")
    calculation(new_polygon)
    print(result)

    

@app.get("/result")
async def root() :
    return result
    print(f"mein resultat{result}")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
