import asyncio
import websockets
import json


async def time(websocket, path):
    while True:

        data = [
            {
                "sensorName": "VMP71",
                "floodGrade": "Hög"
            },
            {
                "sensorName": "VMP70",
                "floodGrade": "Mellan"
            },
            {
                "sensorName": "VMP85",
                "floodGrade": "Ingen"
            },
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(10)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
