# Selection Strategy

There are several ways to select songs from the Spotify API:
- Randomly via search
- Randomly from a playlist
- Through recommendations

## Randomly via Search
I read about this idea from Perry Janssen's blog [here](https://perryjanssen.medium.com/getting-random-tracks-using-the-spotify-api-61889b0c0c27).
Using the search API, you can get a random song by specifying one letter (from a to z) followed by an offset.

Back when Perry wrote this in 2019, the maximum offset allowed by Spotify was 10,000. That decreased to 2000 at one point,
and now it's 1000. That's still not bad, especially for our requirements, but something to note. Additionally, the search
is likely to be biased based on the requester's region and popular songs, so not truly random.

However, there is a significant problem. Some songs are explicit, and the API does not provide a way to filter out
explicit songs when searching. The API does tell us in the response if a song is explicit though. 
If we're trying to avoid having explicit songs be played, then we'd need to run another search if we get an explicit song.
The problem here is that we don't know the upper limit of how long a search could take (theoretically forever, realistically unknown).

## Randomly From a Playlist


## Plan
Playlist Service Feature
- [x] Create explicit and non-explicit versions of playlist
  - [x] Copy explicit playlist
  - [x] Use Spotify API to filter out explicit songs for non-explicit versions into a separate playlist
  - [x] Use Spotify API to filter out songs with preview urls into a separate playlist
  - [x] Use Spotify API to filter out songs that have a preview url and are not explicit into a separate playlist
- [x] Add playlist service methods for given playlist:
  - [x] Fetch a random song with preview. Should take an array of indices to not consider (prevents returning the same song for a question's answer)
  - [x] Fetch a random song name. Should take an array of indices to not consider (prevents returning the same song name for a question)

Game Service Feature
- [ ] createGame function
  - [ ] Caches the next five questions
  - [ ] Creates a new question for every question answered up to the question limit
- [ ] Keeps user score
- [ ] Saves score to local storage