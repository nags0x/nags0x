import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Label } from 'recharts';

const GitHubRepoViewsCounter = () => {
  const [repos, setRepos] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalUniqueViews, setTotalUniqueViews] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Simulated data - replace this with actual API call in a real application
    const simulatedData = [
      { name: 'android-vpn-client', lastUpdated: '2024/9/4', unique: 56892, views: 226698 },
      { name: 'openvpn-install', lastUpdated: '2024/9/3', unique: 6910, views: 13164 },
      { name: 'top-github-users', lastUpdated: '2024/9/2', unique: 7276, views: 17699 },
      { name: 'github-users', lastUpdated: '2024/9/1', unique: 317064, views: 918294 },
      { name: 'profile-views-counter', lastUpdated: '2024/8/31', unique: 441, views: 2542 },
    ];

    setRepos(simulatedData);
    setTotalViews(simulatedData.reduce((sum, repo) => sum + repo.views, 0));
    setTotalUniqueViews(simulatedData.reduce((sum, repo) => sum + repo.unique, 0));
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-black p-3 shadow-lg rounded">
          <p className="font-bold">{label}</p>
          <p>Views: {payload[0].value.toLocaleString()}</p>
          <p>Unique: {payload[1].value.toLocaleString()}</p>
          <p>Last Updated: {payload[0].payload.lastUpdated}</p>
        </div>
      );
    }
    return null;
  };

  const handleMouseMove = (data) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="p-8 bg-black text-white font-mono">
      <h1 className="text-4xl font-bold mb-8 border-b border-white pb-4">GitHub Repository Views</h1>
      <div className="mb-8 text-xl">
        <p>Total Views: <span className="font-bold">{totalViews.toLocaleString()}</span></p>
        <p>Unique Views: <span className="font-bold">{totalUniqueViews.toLocaleString()}</span></p>
      </div>
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-center border-r border-gray-700">Repository</th>
              <th className="py-3 px-4 text-center border-r border-gray-700">Last Updated</th>
              <th className="py-3 px-4 text-center border-r border-gray-700">Unique</th>
              <th className="py-3 px-4 text-center">Views</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => (
              <tr key={repo.name} className={`border-b border-gray-700 ${index === activeIndex ? 'bg-gray-800' : ''}`}>
                <td className="py-3 px-4 text-center border-r border-gray-700">{repo.name}</td>
                <td className="py-3 px-4 text-center border-r border-gray-700">{repo.lastUpdated}</td>
                <td className="py-3 px-4 text-center border-r border-gray-700">{repo.unique.toLocaleString()}</td>
                <td className="py-3 px-4 text-center">{repo.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={repos} 
            margin={{ top: 20, right: 30, left: 60, bottom: 90 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#ffffff">
              <Label value="Repository Name" position="bottom" offset={50} fill="#ffffff" />
            </XAxis>
            <YAxis stroke="#ffffff">
              <Label value="Views" angle={-90} position="insideLeft" offset={-50} fill="#ffffff" />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="views" name="Total Views" stroke="#ffffff" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="unique" name="Unique Views" stroke="#888888" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GitHubRepoViewsCounter;
