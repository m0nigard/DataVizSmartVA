import asyncio
import websockets
import json


async def time(websocket, path):
    while True:

        data = [
            {
                "sensorName": "VMP71",
                "floodGrade": "Medium"
            },
            {
                "sensorName": "VMP70",
                "floodGrade": "High"
            },
            {
                "sensorName": "VMP85",
                "floodGrade": "Medium"
            },
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(10)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
