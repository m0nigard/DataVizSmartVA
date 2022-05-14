import asyncio
import websockets
import json


async def time(websocket, path):
    while True:

        data = [
            {
                "sensorName": "VMP71",
                "floodGrade": "Mellan"
            },
            {
                "sensorName": "VMP70",
                "floodGrade": "Låg"
            },
            {
                "sensorName": "VMP85",
                "floodGrade": "Låg"
            },
            {
                "sensorName": "SNB 6874",
                "floodGrade": "Låg"
            },
            {
                "sensorName": "SNB 6858",
                "floodGrade": "Hög"
            },
            {
                "sensorName": "SNB 7359",
                "floodGrade": "Mellan"
            },
            {
                "sensorName": "SNB 6773",
                "floodGrade": "Ingen"
            },
            {
                "sensorName": "SNB 7398",
                "floodGrade": "Låg"
            },
            {
                "sensorName": "SNB 7521",
                "floodGrade": "Hög"
            }
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(10)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
