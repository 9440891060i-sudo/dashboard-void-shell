import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';
import { Users, UserCheck, Pencil } from 'lucide-react';
import TimeframeSelector, { Timeframe } from './TimeframeSelector';
import EditModal from './EditModal';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface BarGraphSectionProps {
  isExpanded?: boolean;
  isLayoutMode?: boolean;
}

const BarGraphSection = ({ isExpanded = false, isLayoutMode = false }: BarGraphSectionProps) => {
  const [hoveredBar, setHoveredBar] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>('5m');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [barThreshold, setBarThreshold] = useState('100');
  const [dataInterval, setDataInterval] = useState('minutes');
  const [showMLine, setShowMLine] = useState(true);
  const [showCLine, setShowCLine] = useState(true);

  // Metrics data
  const memberCount = 1247;
  const memberChangePercent = 12.5;
  const uniqueAuthorsCount = 89;
  const uniqueAuthorsChangePercent = -3.2;

  const chartData = useMemo(() => {
    const timeLabels = isExpanded
      ? ['8:00', '8:30', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:30']
      : ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30'];
    
    const currentBase = timeframe === '5m' ? 30 : timeframe === '15m' ? 40 : 50;
    const previousBase = timeframe === '5m' ? 25 : timeframe === '15m' ? 35 : 45;
    
    return timeLabels.map((time) => ({
      time,
      current: Math.floor(Math.random() * 40 + currentBase),
      previous: Math.floor(Math.random() * 35 + previousBase),
    }));
  }, [isExpanded, timeframe]);

  const totalPostsData = useMemo(() => {
    const timeLabels = isExpanded
      ? ['8:00', '8:30', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:30']
      : ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30'];
    
    let totalBase = 20;
    let mBase = 8;
    let cBase = 12;
    
    return timeLabels.map((time) => {
      totalBase += Math.floor(Math.random() * 3 - 1);
      mBase += Math.floor(Math.random() * 2 - 0.5);
      cBase += Math.floor(Math.random() * 2 - 0.5);
      
      return {
        time,
        total: Math.max(15, totalBase),
        m: Math.max(5, mBase),
        c: Math.max(8, cBase),
      };
    });
  }, [isExpanded, timeframe]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="px-3 py-2 rounded-lg border border-[hsl(var(--dashboard-border))]"
          style={{ background: 'rgba(0, 0, 0, 0.9)' }}
        >
          <div className="text-white text-xs font-medium mb-1">
            {payload[0].payload.time}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#FFFFFF' }} />
              <span className="text-white text-xs">Current: {payload[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#808080' }} />
              <span className="text-white text-xs">Previous: {payload[1].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="border border-[hsl(var(--dashboard-border))] rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.01] relative"
      style={{
        background: 'linear-gradient(180deg, #0D0D0D 0%, #121212 100%)'
      }}
    >
      {/* Edit Button & Timeframe Selector */}
      {!isLayoutMode && (
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditOpen(true);
            }}
            className={`transition-colors ${isSaved ? 'text-[#8A2BE2] hover:text-[#8A2BE2]/80' : 'text-[#AAAAAA] hover:text-white'}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <TimeframeSelector value={timeframe} onChange={setTimeframe} />
        </div>
      )}

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Bar Graph Settings"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="bar-threshold" className="text-sm text-muted-foreground">
              Alert when bar exceeds value
            </Label>
            <Input
              id="bar-threshold"
              type="number"
              value={barThreshold}
              onChange={(e) => setBarThreshold(e.target.value)}
              className="mt-2 bg-[#1A1F2C] border-[#1E1E1E]"
            />
          </div>
          <div>
            <Label htmlFor="data-interval" className="text-sm text-muted-foreground">
              Data interval
            </Label>
            <Select value={dataInterval} onValueChange={setDataInterval}>
              <SelectTrigger className="mt-2 bg-[#1A1F2C] border-[#1E1E1E]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={() => { setIsSaved(true); setIsEditOpen(false); }}>
            Save Changes
          </Button>
        </div>
      </EditModal>

      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-foreground text-base font-semibold">Members vs Unique Authors</h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            {isExpanded ? 'Extended historical comparison with detailed refresh data' : 'Current vs Previous Refresh'}
          </p>
        </div>

        {/* Charts Container */}
        <div className={`flex-1 min-h-0 flex gap-4 ${isExpanded ? '' : 'flex-col'}`}>
          {/* Main Bar Chart */}
          <div className={`${isExpanded ? 'flex-[0.7]' : 'flex-1'} -mx-2`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData}
                margin={{ top: 30, right: 25, bottom: 5, left: 25 }}
                barGap={-10}
              >
                <XAxis 
                  dataKey="time"
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  tickLine={{ stroke: '#333333' }}
                  axisLine={{ stroke: '#333333' }}
                />
                <YAxis 
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  tickLine={{ stroke: '#333333' }}
                  axisLine={{ stroke: '#333333' }}
                  domain={[0, 80]}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                
                {/* Previous refresh bars (semi-transparent) */}
                <Bar 
                  dataKey="previous"
                  fill="#808080"
                  opacity={0.5}
                  radius={[4, 4, 0, 0]}
                  onMouseEnter={(data) => setHoveredBar(data)}
                  onMouseLeave={() => setHoveredBar(null)}
                />
                
                {/* Current refresh bars (opaque) */}
                <Bar 
                  dataKey="current"
                  fill="#FFFFFF"
                  radius={[4, 4, 0, 0]}
                  label={{
                    position: 'top',
                    fill: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}
                  onMouseEnter={(data) => setHoveredBar(data)}
                  onMouseLeave={() => setHoveredBar(null)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Posts Line Chart - Only shown when expanded */}
          {isExpanded && (
            <div className="flex-[0.3] border-l border-[hsl(var(--dashboard-border))] pl-4 flex flex-col">
              <div className="mb-3">
                <h4 className="text-foreground text-sm font-semibold mb-2">Total Posts</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMLine(!showMLine)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                      showMLine 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500' 
                        : 'bg-[#1C1C1C] text-muted-foreground border border-[#2A2A2A]'
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => setShowCLine(!showCLine)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                      showCLine 
                        ? 'bg-green-500/20 text-green-400 border border-green-500' 
                        : 'bg-[#1C1C1C] text-muted-foreground border border-[#2A2A2A]'
                    }`}
                  >
                    C
                  </button>
                </div>
              </div>
              
              <div className="flex-1 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={totalPostsData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
                  >
                    <XAxis 
                      dataKey="time"
                      stroke="#333333"
                      tick={{ fill: '#666666', fontSize: 10 }}
                      tickLine={{ stroke: '#333333' }}
                      axisLine={{ stroke: '#333333' }}
                    />
                    <YAxis 
                      stroke="#333333"
                      tick={{ fill: '#666666', fontSize: 10 }}
                      tickLine={{ stroke: '#333333' }}
                      axisLine={{ stroke: '#333333' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        border: '1px solid #333',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#666666' }}
                    />
                    
                    {/* Total Posts Line - always visible */}
                    <Line 
                      type="monotone"
                      dataKey="total"
                      stroke="#B0B0B0"
                      strokeWidth={2}
                      dot={{ fill: '#B0B0B0', r: 3 }}
                      animationDuration={300}
                    />
                    
                    {/* M Line - conditionally visible */}
                    {showMLine && (
                      <Line 
                        type="monotone"
                        dataKey="m"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        dot={{ fill: '#60A5FA', r: 3 }}
                        animationDuration={300}
                      />
                    )}
                    
                    {/* C Line - conditionally visible */}
                    {showCLine && (
                      <Line 
                        type="monotone"
                        dataKey="c"
                        stroke="#4ADE80"
                        strokeWidth={2}
                        dot={{ fill: '#4ADE80', r: 3 }}
                        animationDuration={300}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Metrics Section */}
        <div className="grid grid-cols-3 gap-4 mt-2 pt-3 border-t border-[hsl(var(--dashboard-border))]">
          {/* Members */}
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">
                  {memberCount.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Members
                </span>
              </div>
              <div 
                className={`text-sm font-semibold ${memberChangePercent > 0 ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}
              >
                {memberChangePercent > 0 ? '+' : ''}{memberChangePercent}%
              </div>
            </div>
          </div>

          {/* Unique Authors */}
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">
                  {uniqueAuthorsCount.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Unique Authors
                </span>
              </div>
              <div 
                className={`text-sm font-semibold ${uniqueAuthorsChangePercent > 0 ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}
              >
                {uniqueAuthorsChangePercent > 0 ? '+' : ''}{uniqueAuthorsChangePercent}%
              </div>
            </div>
          </div>

          {/* Total Posts */}
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">20</span>
                <span className="text-xs font-medium text-muted-foreground">
                  Total Posts
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span>M : <span className="text-blue-400 font-semibold">8</span></span>
                <span>C : <span className="text-green-400 font-semibold">12</span></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BarGraphSection;
