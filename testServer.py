import asyncio
import datetime
import random
import websockets
import json


async def time(websocket, path):
    while True:

        data = [
            {
                "sensorName": "DNB 5174",
                "floodGrade": "High"
            },
            {
                "sensorName": "DNB 5207",
                "floodGrade": "Low"
            },
            {
                "sensorName": "DNB priv 472",
                "floodGrade": "Medium"
            },
            {
                "sensorName": "DNB 5106",
                "floodGrade": "None"
            },
            {
                "sensorName": "DNB 5109",
                "floodGrade": "High"
            },
            {
                "sensorName": "DNB 5613",
                "floodGrade": "Low"
            },
            {
                "sensorName": "DNB 5708",
                "floodGrade": "Medium"
            },
            {
                "sensorName": "DNB 5686",
                "floodGrade": "High"
            },
            {
                "sensorName": "DNB 5644",
                "floodGrade": "Medium"
            }
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(10)

start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
