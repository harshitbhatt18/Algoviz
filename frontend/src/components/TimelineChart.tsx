import React, { useEffect, useRef } from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import { GanttData } from '../services/SimpleApi.ts';

interface TimelineChartProps {
  ganttData: GanttData[];
  currentTime: number;
  processColors: Record<string, string>;
  title?: string;
}

const TimelineChart: React.FC<TimelineChartProps> = ({
  ganttData,
  currentTime,
  processColors,
  title = 'Timeline Chart'
}) => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Process the gantt data to get unique processes and max time
  const processes = Array.from(new Set(ganttData.map(d => d.process_id))).sort();
  const maxTime = Math.max(...ganttData.map(d => d.end_time), 0);
  
  // Get timeline data for each process
  const timelineData = processes.map(processId => {
    const processBlocks = ganttData
      .filter(d => d.process_id === processId)
      .sort((a, b) => a.start_time - b.start_time);
    
    return {
      processId,
      blocks: processBlocks
    };
  });

  // Draw the timeline chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Add padding to the left for process labels
    const leftPadding = 80; // Increased padding for process labels
    const chartWidth = width - leftPadding;
    
    // Add bottom padding to prevent last process from overlapping
    const bottomPadding = 25;
    const chartHeight = height - bottomPadding;
    const adjustedRowHeight = chartHeight / (processes.length || 1);
    
    ctx.fillStyle = theme.palette.background.paper;
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    
    // Draw horizontal lines (process rows)
    for (let i = 0; i <= processes.length; i++) {
      const y = i * adjustedRowHeight;
      ctx.beginPath();
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Calculate optimal time marker interval to avoid overcrowding
    // Adjust the divisor to get fewer time markers
    const timeMarkerInterval = Math.ceil(maxTime / 6); 
    
    // Draw vertical lines (time markers)
    for (let t = 0; t <= maxTime; t += timeMarkerInterval) {
      const x = leftPadding + (t * chartWidth / maxTime);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, chartHeight);
      ctx.stroke();
      
      // Add time markers with improved positioning
      ctx.fillStyle = theme.palette.text.secondary;
      ctx.font = 'bold 12px Arial'; // Increased font size
      ctx.textAlign = 'center';
      ctx.fillText(t.toString(), x, height - 8);
    }
    
    // Draw process labels with improved positioning
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.palette.text.primary;
    ctx.font = 'bold 14px Arial'; // Increased font size and made bold
    
    for (let i = 0; i < processes.length; i++) {
      const y = i * adjustedRowHeight + adjustedRowHeight / 2 + 5; // Better vertical centering
      // Move process labels further to the left to avoid overlapping with blocks
      ctx.fillText(processes[i], leftPadding - 15, y);
    }
    
    // Draw timeline blocks for each process
    timelineData.forEach((data, index) => {
      const y = index * adjustedRowHeight;
      
      data.blocks.forEach(block => {
        // Adjust x position to account for left padding
        const x = leftPadding + (block.start_time * chartWidth / maxTime);
        const blockWidth = (block.end_time - block.start_time) * chartWidth / maxTime;
        // Reduce the height of blocks to create more vertical space
        const blockHeight = adjustedRowHeight * 0.65; 
        const blockY = y + (adjustedRowHeight - blockHeight) / 2;
        
        // Draw block
        ctx.fillStyle = processColors[data.processId];
        ctx.fillRect(x, blockY, blockWidth, blockHeight);
        
        // Draw border
        ctx.strokeStyle = theme.palette.background.paper;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, blockY, blockWidth, blockHeight);
        
        // Add process ID label if block is wide enough
        // Increase the minimum width requirement for showing text
        if (blockWidth > 40) {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 14px Arial'; // Increased font size
          ctx.textAlign = 'center';
          ctx.fillText(
            data.processId,
            x + blockWidth / 2,
            blockY + blockHeight / 2 + 5
          );
        }
      });
    });
    
    // Draw current time marker
    if (currentTime <= maxTime) {
      const x = leftPadding + (currentTime * chartWidth / maxTime);
      ctx.strokeStyle = theme.palette.error.main;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, chartHeight);
      ctx.stroke();
      
      // Improve current time label positioning to avoid overlap
      ctx.fillStyle = theme.palette.error.main;
      ctx.font = 'bold 14px Arial'; // Increased font size
      ctx.textAlign = 'center';
      // Position the time label at the top with enough clearance
      ctx.fillText(`Time: ${currentTime}`, x, 20);
    }
  }, [ganttData, currentTime, processes, maxTime, processColors, theme]);

  return (
    <Paper
      elevation={3} // Increased elevation for better shadow
      sx={{
        p: { xs: 2, sm: 3 }, // Adjusted padding for mobile
        my: 2, // Reduced margin
        borderRadius: '12px',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(159, 174, 240, 0.2)',
        maxHeight: '500px', // Limit maximum height for better layout
        overflow: 'hidden', // Ensure content doesn't overflow
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ 
          mb: 2, 
          fontWeight: 600, 
          color: theme.palette.primary.main, 
          fontSize: { xs: '1rem', sm: '1.2rem' }  // Smaller font on mobile
        }}
      >
        {title}
      </Typography>
      
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          // Responsive height adjustment
          height: {
            xs: Math.min(280, Math.max(120, 30 + processes.length * 40)),
            sm: Math.min(350, Math.max(120, 30 + processes.length * 55))
          },
          mt: 2, // Reduced margin top
          overflow: 'hidden',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)', // Added inner shadow
        }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          // Match the responsive height here
          height={Math.min(350, Math.max(120, 30 + processes.length * 55))}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      
      {/* Legend with improved layout - more compact and responsive */}
      <Box sx={{ 
        mt: 2, // Reduced margin top
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: { xs: 1, sm: 1.5 }, // Adjusted gap for mobile
        justifyContent: 'center',
        p: { xs: 1, sm: 1.5 }, // Reduced padding for mobile
        bgcolor: 'rgba(237, 241, 255, 0.5)',
        borderRadius: '8px',
        maxHeight: { xs: '120px', sm: 'none' }, // Add scrolling on mobile if many processes
        overflowY: { xs: 'auto', sm: 'visible' },
      }}>
        {processes.map(processId => (
          <Box
            key={processId}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 }, // Reduced gap on mobile
              fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Smaller font on mobile
              p: { xs: 0.5, sm: 1 }, // Reduced padding on mobile
              bgcolor: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(47, 75, 191, 0.06)',
              border: '1px solid rgba(159, 174, 240, 0.3)',
            }}
          >
            <Box
              sx={{
                width: { xs: 12, sm: 16 }, // Smaller color box on mobile
                height: { xs: 12, sm: 16 }, // Smaller color box on mobile
                bgcolor: processColors[processId],
                borderRadius: '3px',
              }}
            />
            <Typography 
              variant="body2" // Changed from caption to body2 for larger text
              sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.85rem' } }} // Responsive font size
            >
              {processId}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TimelineChart; 