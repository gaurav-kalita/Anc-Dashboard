import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SportsData, Team, Game, Player } from '../../Types';
import { API_ENDPOINTS } from '../../Constants';

interface DataState {
  data: SportsData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch(API_ENDPOINTS.GAME_INFOS);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const initialState: DataState = {
  data: null,
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updatePlayerInfo: (
      state,
      action: PayloadAction<{
        teamName: string;
        playerName: string;
        newAge?: number;
        newName?: string;
      }>
    ) => {
      const { teamName, playerName, newAge, newName } = action.payload;

      state.data?.forEach((game: Game) => {
        game.teams.forEach((team: Team) => {
          if (team.team_name === teamName) {
            const player = team.players.find(
              player => player.name === playerName
            );

            if (player) {
              if (newAge !== undefined) {
                player.age = newAge;
              }
              if (newName !== undefined) {
                player.name = newName;
              }
            }
          }
        });
      });
    },
    addPlayer: (
      state,
      action: PayloadAction<{ teamName: string; newPlayer: Player }>
    ) => {
      const { teamName, newPlayer } = action.payload;

      state.data?.forEach((game: Game) => {
        game.teams.forEach((team: Team) => {
          if (team.team_name === teamName) {
            team.players.unshift(newPlayer);
          }
        });
      });
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        if (action.payload) {
          state.status = 'failed';
          state.error = action.payload.toString();
        } else {
          state.status = 'failed';
          state.error = 'Unknown error';
        }
      });
  },
});

export default dataSlice.reducer;
export const { updatePlayerInfo, addPlayer } = dataSlice.actions;
