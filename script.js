const matchTitle = document.querySelector('.match-title');
		const team1Name = document.querySelector('.team1-name');
		const team1Run = document.querySelector('.team1-run');
		const team2Name = document.querySelector('.team2-name');
		const team2Run = document.querySelector('.team2-run');
		const matchPlace = document.querySelector('.match-place');
		const matchDate = document.querySelector('.match-date');
		const matchTime = document.querySelector('.match-time');
		const matchOverview = document.querySelector('.match-overview');

		const api = 'https://cricbuzz-live.vercel.app/v1/matches/live?type=international';

		const getScore = async () => {
			try {
				const response = await fetch(api);
				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}

				const result = await response.json();
				
				// Update HTML with match details
				matchTitle.innerText = `Match Title: ${result.data.matches[0].title}`;
				
				// Check if teams data exists
				if (result.data.matches[0].teams && result.data.matches[0].teams.length > 0) {
					team1Name.innerText = `Team 1 Name: ${result.data.matches[0].teams[0].team}`;
					team1Run.innerText = `Team 1 Run: ${result.data.matches[0].teams[0].run}`;
					
					team2Name.innerText = `Team 2 Name: ${result.data.matches[0].teams[1].team}`;
					team2Run.innerText = `Team 2 Run: ${result.data.matches[0].teams[1].run}`;
				} else {
					team1Name.innerText = 'Team 1 Name: Not available';
					team1Run.innerText = 'Team 1 Run: Not available';
					team2Name.innerText = 'Team 2 Name: Not available';
					team2Run.innerText = 'Team 2 Run: Not available';
				}

				// Time and Place data
				matchPlace.innerText = `Place: ${result.data.matches[0].timeAndPlace.place}`;
				matchDate.innerText = `Date: ${result.data.matches[0].timeAndPlace.date}`;
				matchTime.innerText = `Time: ${result.data.matches[0].timeAndPlace.time}`;
				
				// Overview data
				matchOverview.innerText = `Match Overview: ${result.data.matches[0].overview || "No overview available"}`;

			} catch (error) {
				console.error('Error Fetching Data:', error);
			}
		}

		// Automatically fetch data every second (1000 ms)
		setInterval(getScore, 1000);