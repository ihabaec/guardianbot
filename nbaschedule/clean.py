import json
from collections import defaultdict
from datetime import datetime

# Load the JSON data
with open('nba-schedule"unclean".json', 'r') as file:
    data = json.load(file)

grouped_games = defaultdict(list)

# Iterate through the game dates
for game_date in data['leagueSchedule']['gameDates']:
    date_key = game_date['gameDate'].split()[0]  # Extract the date part

    for game in game_date['games']:
        game_time = game['gameDateTimeEst'].split('T')[1]  # Extract the time part
        game_time_est = game_time.replace('Z', ' EST')  # Replace 'Z' with 'EST'

        cleaned_game = {
            "gameTimeEst": game_time_est,
            "homeTeam": {
                "teamName": game['homeTeam']['teamName'],
                "teamCity": game['homeTeam']['teamCity']
            },
            "awayTeam": {
                "teamName": game['awayTeam']['teamName'],
                "teamCity": game['awayTeam']['teamCity']
            }
        }
        grouped_games[date_key].append(cleaned_game)

# Sort games by time for each date
for date, games in grouped_games.items():
    games.sort(key=lambda x: datetime.strptime(x['gameTimeEst'], '%H:%M:%S EST'))

# Create the final cleaned data structure
cleaned_data = {
    "gameDates": [
        {
            "gameDate": date,
            "games": games
        }
        for date, games in grouped_games.items()
    ]
}


with open('cleaned_nba_schedule.json', 'w') as file:
    json.dump(cleaned_data, file, indent=4)

print("Games have been sorted by time and saved to 'cleaned_nba_schedule.json'.")