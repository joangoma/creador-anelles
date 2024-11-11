import { Link } from 'react-router-dom';
import { TEAMS } from '../data/constants';

const TeamList = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Colles de l'agrupació</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {Object.entries(TEAMS).map(([teamId, team]) => (
          <div key={teamId} className="space-y-4">
            <h2 className="text-2xl font-bold">{teamId}</h2>
            <div className="grid gap-4">
              {Object.entries(team.configurations).map(([configId, config]) => (
                <Link
                  key={`${teamId}-${configId}`}
                  to={`/team/${teamId}/${configId}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{configId}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;