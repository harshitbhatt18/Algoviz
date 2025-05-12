# CPU Scheduling Algorithm Visualizer

A web application to visualize and compare different CPU scheduling algorithms. Built with React, TypeScript, Material UI, and Flask.

## Features

- Interactive visualization of CPU scheduling algorithms
- Support for 5 different algorithms:
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF)
  - Shortest Remaining Time First (SRTF)
  - Priority Scheduling
  - Round Robin
- Gantt chart visualization
- Performance metrics comparison
- Process table with timing details
- Generate random process sets
- Analyze and compare algorithm performance

## Tech Stack

### Frontend
- React
- TypeScript
- Material UI (MUI)
- Chart.js & React Chartjs 2
- Recharts for comparative visualizations
- React Router for navigation
- Axios for API requests

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd cpu-scheduler/frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Run the React development server:
   ```
   npm start
   ```
   
   The application will be available at http://localhost:3000

## Project Structure

```
cpu-scheduler/
├── backend/
│   └── app.py           # Flask server with algorithm implementations
└── frontend/
    ├── public/          # Static files
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Page components
        ├── services/    # API services
        └── App.tsx      # Main application component
```

## Usage

1. Navigate to the application in your browser
2. Select an algorithm or go to the comparison page
3. Add processes manually or generate random processes
4. Configure algorithm parameters if needed (e.g., time quantum for Round Robin)
5. Click "Calculate" to visualize the scheduling
6. View the results in the Gantt chart and performance metrics

## Algorithms Implemented

### First Come First Serve (FCFS)
- Non-preemptive
- Processes are executed in the order they arrive
- Simple but can lead to the convoy effect

### Shortest Job First (SJF)
- Non-preemptive
- Processes with the shortest burst time are executed first
- Optimal for minimizing average waiting time

### Shortest Remaining Time First (SRTF)
- Preemptive version of SJF
- Processes with the shortest remaining time are executed first
- CPU is preempted when a new process with a shorter burst time arrives

### Priority Scheduling
- Non-preemptive
- Processes are executed based on priority
- Can lead to starvation of low-priority processes

### Round Robin
- Preemptive
- Each process is given a fixed time quantum
- Designed for time-sharing systems

## License

This project is open source and available under the MIT License.

## Acknowledgements

- Material UI for the beautiful UI components
- Chart.js for the visualization capabilities
- The React and Flask communities for their excellent documentation 