import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  updatePlayerInfo,
  addPlayer,
} from '../../Features/data/dataSlice';
import { AppDispatch, RootState } from '../../store';
import Card from '../../Components/Card';
import { Game, Player, Team } from '../../Types';
import Loader from '../../Components/Loader';

export const Home: React.FC = () => {
  const [editedAges, setEditedAges] = useState<{ [key: string]: string }>({});
  const [editedNames, setEditedNames] = useState<{ [key: string]: string }>({});

  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="">
        <Loader size={50} />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleNameAdd = (teamName: string, newName: string) => {
    setEditedNames(prevNames => ({
      ...prevNames,
      [teamName]: newName,
    }));
  };

  const handleAgeAdd = (teamName: string, newAge: string) => {
    setEditedAges(prevAges => ({
      ...prevAges,
      [teamName]: newAge,
    }));
  };

  const handleAgeChange = (
    teamName: string,
    playerName: string,
    newAge: string
  ) => {
    const playerKey = `${teamName}-${playerName}`;

    setEditedAges(prevAges => ({
      ...prevAges,
      [playerKey]: newAge,
    }));
  };

  const handleNameChange = (
    teamName: string,
    playerName: string,
    newName: string
  ) => {
    const playerKey = `${teamName}-${playerName}`;

    setEditedNames(prevNames => ({
      ...prevNames,
      [playerKey]: newName,
    }));
  };

  const handleSave = (teamName: string, playerName: string) => {
    const playerKey = `${teamName}-${playerName}`;
    const editedAge = editedAges[playerKey];
    const editedName = editedNames[playerKey];

    if (editedAge !== undefined || editedName !== undefined) {
      dispatch(
        updatePlayerInfo({
          teamName: teamName,
          playerName: playerName,
          newAge: editedAge !== undefined ? parseInt(editedAge) : undefined,
          newName: editedName !== undefined ? editedName : undefined,
        })
      );

      // Reset the edited values after saving changes
      setEditedAges(prevAges => {
        const newState = { ...prevAges };
        delete newState[playerKey];
        return newState;
      });

      setEditedNames(prevNames => {
        const newState = { ...prevNames };
        delete newState[playerKey];
        return newState;
      });
    }
  };

  const handleAdd = (teamName: string) => {
    const newPlayer: Player = {
      name: editedNames[teamName] ?? '',
      age: editedAges[teamName] ? parseInt(editedAges[teamName]) : 0,
    };

    if (newPlayer.name !== '') {
      dispatch(addPlayer({ teamName, newPlayer }));

      // Reset input values after adding a player
      setEditedAges(prevAges => {
        const newState = { ...prevAges };
        delete newState[teamName];
        return newState;
      });

      setEditedNames(prevNames => {
        const newState = { ...prevNames };
        delete newState[teamName];
        return newState;
      });
    }
  };

  return (
    <>
      {data?.map((game: Game, key: number) => {
        return (
          <div className="m-5 max-w-xl mx-auto" key={key}>
            <Card>
              <div className="text-xl font-bold bg-ANC-background p-5">
                {game.game}
              </div>
              {game.teams.map((team: Team) => {
                const teamName = team.team_name;
                return (
                  <div key={team.team_name}>
                    <h1 className="p-5 text-lg font-bold">
                      {teamName} ({team.players.length})
                    </h1>
                    <div className="grid grid-cols-6 gap-4 m-2 hr">
                      <input
                        type="text"
                        placeholder="Add new player"
                        className="bg-ANC-background rounded col-span-4 p-2"
                        value={editedNames[teamName] ?? ''}
                        onChange={e => handleNameAdd(teamName, e.target.value)}
                        onBlur={() => handleAdd(teamName)}
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        className="bg-ANC-background rounded col-span-1 p-2"
                        value={editedAges[teamName] ?? ''}
                        onChange={e => handleAgeAdd(teamName, e.target.value)}
                        onBlur={() => handleAdd(teamName)}
                      />
                      <div className="bg-ANC-default_2 hover:bg-ANC-default cursor-pointer text-white font-bold py-2 px-4 rounded">
                        <button onClick={() => handleAdd(teamName)}>
                          Add Player
                        </button>
                      </div>
                    </div>

                    {team.players.map((player: Player) => {
                      const playerKey = `${team.team_name}-${player.name}`;

                      return (
                        <div
                          className="grid grid-cols-6 gap-4 m-2 hr"
                          key={playerKey}
                        >
                          <input
                            type="text"
                            className="bg-ANC-background rounded col-span-4 p-2"
                            value={editedNames[playerKey] ?? player.name}
                            onBlur={() =>
                              handleSave(team.team_name, player.name)
                            }
                            onChange={e =>
                              handleNameChange(
                                team.team_name,
                                player.name,
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="number"
                            className="bg-ANC-background rounded col-span-1 p-2"
                            value={editedAges[playerKey] ?? player.age}
                            onBlur={() =>
                              handleSave(team.team_name, player.name)
                            }
                            onChange={e =>
                              handleAgeChange(
                                team.team_name,
                                player.name,
                                e.target.value
                              )
                            }
                          />
                          <div className="bg-ANC-default_2 hover:bg-ANC-default cursor-pointer text-white font-bold py-2 px-4 rounded">
                            <button
                              onClick={() =>
                                handleSave(team.team_name, player.name)
                              }
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default Home;
