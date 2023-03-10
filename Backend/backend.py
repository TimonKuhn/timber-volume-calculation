# Imports für Rest API Schnittstelle
import uvicorn
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost:3000",
    "https://vm4.sourcelab.ch"
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
async def polyjson(info :Request):
    req_info = await info.json()
    new_polygon = req_info['input']
    print(f"this is my data:{new_polygon}")


@app.get("/result")
async def root() :
    return {"Anzahl":5,
            "Volumen":21020
            }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

