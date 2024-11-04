import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const DelhiPollutionSimulator = () => {
  const [stateAutonomy, setStateAutonomy] = useState(35);
  
  // Calculate how powers shift based on state autonomy
  const getPowerDistribution = (autonomyLevel) => {
    const remainingPower = 100 - autonomyLevel;
    const centralShare = Math.floor(remainingPower * 0.6);
    const lgShare = remainingPower - centralShare;
    return {
      state: autonomyLevel,
      central: centralShare,
      lg: lgShare
    };
  };

  // Simulate pollution reduction based on autonomy level
  const calculatePollutionLevel = (autonomyLevel) => {
    // Base AQI of 400 (Very Poor) reduces as autonomy increases
    const baseAQI = 400;
    const maxReduction = 250; // Maximum possible reduction
    const reduction = (autonomyLevel / 100) * maxReduction;
    return Math.max(baseAQI - reduction, 150); // Won't go below 150 AQI (Moderate)
  };

  const powers = getPowerDistribution(stateAutonomy);
  const pollutionLevel = calculatePollutionLevel(stateAutonomy);

  const getAQICategory = (aqi) => {
    if (aqi > 300) return { label: 'Hazardous', color: '#7E0023' };
    if (aqi > 200) return { label: 'Very Poor', color: '#A70026' };
    if (aqi > 150) return { label: 'Poor', color: '#D35400' };
    if (aqi > 100) return { label: 'Moderate', color: '#F39C12' };
    if (aqi > 50) return { label: 'Satisfactory', color: '#27AE60' };
    return { label: 'Good', color: '#2ECC71' };
  };

  const aqiStatus = getAQICategory(pollutionLevel);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Delhi Governance Powers & Pollution Simulator
          <Info className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="block text-lg font-medium">
            Delhi Government Autonomy Level: {stateAutonomy}%
          </label>
          <input
            type="range"
            min="35"
            max="100"
            value={stateAutonomy}
            onChange={(e) => setStateAutonomy(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-orange-100">
            <div className="text-lg font-semibold">Delhi Govt</div>
            <div className="text-2xl">{powers.state}%</div>
          </div>
          <div className="p-4 border rounded-lg bg-blue-100">
            <div className="text-lg font-semibold">Central Govt</div>
            <div className="text-2xl">{powers.central}%</div>
          </div>
          <div className="p-4 border rounded-lg bg-green-100">
            <div className="text-lg font-semibold">LG Powers</div>
            <div className="text-2xl">{powers.lg}%</div>
          </div>
        </div>

        <Alert className="border-l-4" style={{ borderLeftColor: aqiStatus.color }}>
          <AlertDescription className="flex justify-between items-center">
            <span className="text-lg">Current AQI Level: {Math.round(pollutionLevel)}</span>
            <span className="font-medium" style={{ color: aqiStatus.color }}>
              {aqiStatus.label}
            </span>
          </AlertDescription>
        </Alert>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { autonomy: 35, aqi: calculatePollutionLevel(35) },
                { autonomy: stateAutonomy, aqi: pollutionLevel },
                { autonomy: 100, aqi: calculatePollutionLevel(100) }
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="autonomy" 
                label={{ value: 'State Autonomy %', position: 'bottom' }} 
              />
              <YAxis 
                label={{ value: 'AQI Level', angle: -90, position: 'insideLeft' }}
                domain={[150, 400]}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-lg">Key Improvements with Full State Powers:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Unified command and control for pollution response</li>
            <li>Quick decision-making during pollution emergencies</li>
            <li>Better coordination between different departments</li>
            <li>Direct control over law enforcement for pollution violations</li>
            <li>Streamlined implementation of environmental policies</li>
          </ul>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          Note: This is a simplified simulation for demonstration purposes. Actual pollution reduction would depend on multiple complex factors beyond just governance structure.
        </div>
      </CardContent>
    </Card>
  );
};

export default DelhiPollutionSimulator;