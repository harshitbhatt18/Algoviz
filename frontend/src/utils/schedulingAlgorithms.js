// CPU Scheduling algorithms implementation

export const fcfs = (processes) => {
    const n = processes.length;
    
    // Make a copy of processes to preserve input
    const processes_copy = processes.map(process => ({
        ...process,
        arrival_time: process.arrival_time || 0
    }));
    
    // Sort processes by arrival time, then by PID for tie-breaking
    processes_copy.sort((a, b) => {
        if (a.arrival_time !== b.arrival_time) {
            return a.arrival_time - b.arrival_time;
        }
        return a.process_id.localeCompare(b.process_id);
    });
    
    // Initialize arrays for calculations
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const completion_time = new Array(n).fill(0);
    
    // Create Gantt chart data
    const gantt_data = [];
    let current_time = 0;
    
    for (let i = 0; i < n; i++) {
        // If there's idle time between processes
        if (current_time < processes_copy[i].arrival_time) {
            current_time = processes_copy[i].arrival_time;
        }
        
        const start_time = current_time;
        current_time += processes_copy[i].burst_time;
        completion_time[i] = current_time;
        
        gantt_data.push({
            process_id: processes_copy[i].process_id,
            start_time: start_time,
            end_time: current_time,
            arrival_time: processes_copy[i].arrival_time
        });
        
        // Calculate turnaround time and waiting time
        tat[i] = completion_time[i] - processes_copy[i].arrival_time;
        wt[i] = tat[i] - processes_copy[i].burst_time;
    }
    
    // Calculate average waiting time and average turnaround time
    const total_wt = wt.reduce((a, b) => a + b, 0);
    const total_tat = tat.reduce((a, b) => a + b, 0);
    const avg_wt = total_wt / n;
    const avg_tat = total_tat / n;
    
    // Create result data
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push({
            process_id: processes_copy[i].process_id,
            burst_time: processes_copy[i].burst_time,
            arrival_time: processes_copy[i].arrival_time,
            waiting_time: wt[i],
            turnaround_time: tat[i],
            completion_time: completion_time[i]
        });
    }
    
    return {
        results,
        avg_waiting_time: avg_wt,
        avg_turnaround_time: avg_tat,
        gantt_data
    };
};

export const sjf = (processes) => {
    const n = processes.length;
    
    // Make a copy of processes to preserve input
    const processes_copy = processes.map(process => ({
        ...process,
        arrival_time: process.arrival_time || 0,
        is_completed: false
    }));
    
    // Initialize arrays for calculations
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const completion_time = new Array(n).fill(0);
    
    // Create Gantt chart data
    const gantt_data = [];
    let current_time = 0;
    let completed = 0;
    
    // Process until all processes are completed
    while (completed < n) {
        // Find process with minimum burst time among the arrived ones
        let min_burst = Infinity;
        let selected_process = -1;
        
        for (let i = 0; i < n; i++) {
            if (!processes_copy[i].is_completed && 
                processes_copy[i].arrival_time <= current_time &&
                processes_copy[i].burst_time < min_burst) {
                min_burst = processes_copy[i].burst_time;
                selected_process = i;
            } else if (!processes_copy[i].is_completed && 
                       processes_copy[i].arrival_time <= current_time &&
                       processes_copy[i].burst_time === min_burst) {
                // Tie-breaking by arrival time
                if (processes_copy[i].arrival_time < processes_copy[selected_process].arrival_time) {
                    selected_process = i;
                } else if (processes_copy[i].arrival_time === processes_copy[selected_process].arrival_time) {
                    // Further tie-breaking by process ID
                    if (processes_copy[i].process_id.localeCompare(processes_copy[selected_process].process_id) < 0) {
                        selected_process = i;
                    }
                }
            }
        }
        
        // If no process is found, increment time
        if (selected_process === -1) {
            current_time++;
            continue;
        }
        
        // Execute the selected process
        const start_time = current_time;
        current_time += processes_copy[selected_process].burst_time;
        completion_time[selected_process] = current_time;
        
        // Mark as completed
        processes_copy[selected_process].is_completed = true;
        completed++;
        
        // Add to Gantt chart
        gantt_data.push({
            process_id: processes_copy[selected_process].process_id,
            start_time: start_time,
            end_time: current_time,
            arrival_time: processes_copy[selected_process].arrival_time
        });
        
        // Calculate turnaround time and waiting time
        tat[selected_process] = completion_time[selected_process] - processes_copy[selected_process].arrival_time;
        wt[selected_process] = tat[selected_process] - processes_copy[selected_process].burst_time;
    }
    
    // Calculate average waiting time and average turnaround time
    const total_wt = wt.reduce((a, b) => a + b, 0);
    const total_tat = tat.reduce((a, b) => a + b, 0);
    const avg_wt = total_wt / n;
    const avg_tat = total_tat / n;
    
    // Create result data
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push({
            process_id: processes_copy[i].process_id,
            burst_time: processes_copy[i].burst_time,
            arrival_time: processes_copy[i].arrival_time,
            waiting_time: wt[i],
            turnaround_time: tat[i],
            completion_time: completion_time[i]
        });
    }
    
    return {
        results,
        avg_waiting_time: avg_wt,
        avg_turnaround_time: avg_tat,
        gantt_data
    };
};

export const srtf = (processes) => {
    const n = processes.length;
    
    // Make a copy of processes to preserve input
    const processes_copy = processes.map(process => ({
        ...process,
        arrival_time: process.arrival_time || 0,
        remaining_time: process.burst_time,
        is_completed: false
    }));
    
    // Sort processes based on arrival time
    processes_copy.sort((a, b) => {
        if (a.arrival_time !== b.arrival_time) {
            return a.arrival_time - b.arrival_time;
        }
        return a.process_id.localeCompare(b.process_id);
    });
    
    // Initialize arrays for calculations
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const completion_time = new Array(n).fill(0);
    
    // Create Gantt chart data
    const gantt_data = [];
    let current_time = 0;
    let completed = 0;
    let current_process = null;
    let last_process_id = null;
    
    // Process until all processes are completed
    while (completed < n) {
        // Find process with minimum remaining time among the arrived ones
        let min_remaining = Infinity;
        let selected_process = -1;
        
        for (let i = 0; i < n; i++) {
            if (!processes_copy[i].is_completed && 
                processes_copy[i].arrival_time <= current_time &&
                processes_copy[i].remaining_time < min_remaining) {
                min_remaining = processes_copy[i].remaining_time;
                selected_process = i;
            } else if (!processes_copy[i].is_completed && 
                       processes_copy[i].arrival_time <= current_time &&
                       processes_copy[i].remaining_time === min_remaining) {
                // Tie-breaking by arrival time
                if (processes_copy[i].arrival_time < processes_copy[selected_process].arrival_time) {
                    selected_process = i;
                } else if (processes_copy[i].arrival_time === processes_copy[selected_process].arrival_time) {
                    // Further tie-breaking by process ID
                    if (processes_copy[i].process_id.localeCompare(processes_copy[selected_process].process_id) < 0) {
                        selected_process = i;
                    }
                }
            }
        }
        
        // If no process is found, increment time
        if (selected_process === -1) {
            current_time++;
            continue;
        }
        
        // Update remaining time of selected process
        processes_copy[selected_process].remaining_time--;
        
        // Update Gantt chart data
        if (last_process_id !== processes_copy[selected_process].process_id) {
            if (current_process) {
                current_process.end_time = current_time;
                gantt_data.push(current_process);
            }
            
            current_process = {
                process_id: processes_copy[selected_process].process_id,
                start_time: current_time,
                end_time: current_time + 1,
                arrival_time: processes_copy[selected_process].arrival_time
            };
            
            last_process_id = processes_copy[selected_process].process_id;
        }
        
        // Increment time
        current_time++;
        
        // Check if process is completed
        if (processes_copy[selected_process].remaining_time === 0) {
            // Mark as completed
            processes_copy[selected_process].is_completed = true;
            completed++;
            
            // Record completion time
            completion_time[selected_process] = current_time;
            
            // Calculate turnaround time and waiting time
            tat[selected_process] = completion_time[selected_process] - processes_copy[selected_process].arrival_time;
            wt[selected_process] = tat[selected_process] - processes_copy[selected_process].burst_time;
        }
    }
    
    // Add the last process to Gantt chart
    if (current_process) {
        current_process.end_time = current_time;
        gantt_data.push(current_process);
    }
    
    // Calculate average waiting time and average turnaround time
    const total_wt = wt.reduce((a, b) => a + b, 0);
    const total_tat = tat.reduce((a, b) => a + b, 0);
    const avg_wt = total_wt / n;
    const avg_tat = total_tat / n;
    
    // Create result data
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push({
            process_id: processes_copy[i].process_id,
            burst_time: processes_copy[i].burst_time,
            arrival_time: processes_copy[i].arrival_time,
            waiting_time: wt[i],
            turnaround_time: tat[i],
            completion_time: completion_time[i]
        });
    }
    
    return {
        results,
        avg_waiting_time: avg_wt,
        avg_turnaround_time: avg_tat,
        gantt_data
    };
};

export const priorityScheduling = (processes, isPreemptive = false) => {
    const n = processes.length;
    
    // Make a copy of processes to preserve input
    const processes_copy = processes.map(process => ({
        ...process,
        arrival_time: process.arrival_time || 0,
        priority: process.priority || 0,
        remaining_time: process.burst_time,
        is_completed: false
    }));
    
    // Sort processes based on arrival time initially
    processes_copy.sort((a, b) => {
        if (a.arrival_time !== b.arrival_time) {
            return a.arrival_time - b.arrival_time;
        }
        return a.process_id.localeCompare(b.process_id);
    });
    
    // Initialize arrays for calculations
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const completion_time = new Array(n).fill(0);
    
    // Create Gantt chart data
    const gantt_data = [];
    let current_time = 0;
    let completed = 0;
    let current_process = null;
    let last_process_id = null;
    
    if (isPreemptive) {
        // Preemptive Priority Scheduling (similar to SRTF but with priority)
        while (completed < n) {
            // Find process with highest priority (lowest number) among the arrived ones
            let highest_priority = Infinity;
            let selected_process = -1;
            
            for (let i = 0; i < n; i++) {
                if (!processes_copy[i].is_completed && 
                    processes_copy[i].arrival_time <= current_time &&
                    processes_copy[i].priority < highest_priority) {
                    highest_priority = processes_copy[i].priority;
                    selected_process = i;
                } else if (!processes_copy[i].is_completed && 
                          processes_copy[i].arrival_time <= current_time &&
                          processes_copy[i].priority === highest_priority) {
                    // Tie-breaking by arrival time
                    if (processes_copy[i].arrival_time < processes_copy[selected_process].arrival_time) {
                        selected_process = i;
                    } else if (processes_copy[i].arrival_time === processes_copy[selected_process].arrival_time) {
                        // Further tie-breaking by process ID
                        if (processes_copy[i].process_id.localeCompare(processes_copy[selected_process].process_id) < 0) {
                            selected_process = i;
                        }
                    }
                }
            }
            
            // If no process is found, increment time
            if (selected_process === -1) {
                current_time++;
                continue;
            }
            
            // Update remaining time of selected process
            processes_copy[selected_process].remaining_time--;
            
            // Update Gantt chart data
            if (last_process_id !== processes_copy[selected_process].process_id) {
                if (current_process) {
                    current_process.end_time = current_time;
                    gantt_data.push(current_process);
                }
                
                current_process = {
                    process_id: processes_copy[selected_process].process_id,
                    start_time: current_time,
                    end_time: current_time + 1,
                    arrival_time: processes_copy[selected_process].arrival_time,
                    priority: processes_copy[selected_process].priority
                };
                
                last_process_id = processes_copy[selected_process].process_id;
            }
            
            // Increment time
            current_time++;
            
            // Check if process is completed
            if (processes_copy[selected_process].remaining_time === 0) {
                // Mark as completed
                processes_copy[selected_process].is_completed = true;
                completed++;
                
                // Record completion time
                completion_time[selected_process] = current_time;
                
                // Calculate turnaround time and waiting time
                tat[selected_process] = completion_time[selected_process] - processes_copy[selected_process].arrival_time;
                wt[selected_process] = tat[selected_process] - processes_copy[selected_process].burst_time;
            }
        }
        
        // Add the last process to Gantt chart
        if (current_process) {
            current_process.end_time = current_time;
            gantt_data.push(current_process);
        }
    } else {
        // Non-preemptive Priority Scheduling
        while (completed < n) {
            // Find process with highest priority (lowest number) among the arrived ones
            let highest_priority = Infinity;
            let selected_process = -1;
            
            for (let i = 0; i < n; i++) {
                if (!processes_copy[i].is_completed && 
                    processes_copy[i].arrival_time <= current_time &&
                    processes_copy[i].priority < highest_priority) {
                    highest_priority = processes_copy[i].priority;
                    selected_process = i;
                } else if (!processes_copy[i].is_completed && 
                          processes_copy[i].arrival_time <= current_time &&
                          processes_copy[i].priority === highest_priority) {
                    // Tie-breaking by arrival time
                    if (processes_copy[i].arrival_time < processes_copy[selected_process].arrival_time) {
                        selected_process = i;
                    } else if (processes_copy[i].arrival_time === processes_copy[selected_process].arrival_time) {
                        // Further tie-breaking by process ID
                        if (processes_copy[i].process_id.localeCompare(processes_copy[selected_process].process_id) < 0) {
                            selected_process = i;
                        }
                    }
                }
            }
            
            // If no process is found, increment time
            if (selected_process === -1) {
                current_time++;
                continue;
            }
            
            // Execute the selected process (non-preemptive)
            const start_time = current_time;
            current_time += processes_copy[selected_process].burst_time;
            
            // Mark as completed
            processes_copy[selected_process].is_completed = true;
            completed++;
            
            // Record completion time
            completion_time[selected_process] = current_time;
            
            // Add to Gantt chart
            gantt_data.push({
                process_id: processes_copy[selected_process].process_id,
                start_time: start_time,
                end_time: current_time,
                arrival_time: processes_copy[selected_process].arrival_time,
                priority: processes_copy[selected_process].priority
            });
            
            // Calculate turnaround time and waiting time
            tat[selected_process] = completion_time[selected_process] - processes_copy[selected_process].arrival_time;
            wt[selected_process] = tat[selected_process] - processes_copy[selected_process].burst_time;
        }
    }
    
    // Calculate average waiting time and average turnaround time
    const total_wt = wt.reduce((a, b) => a + b, 0);
    const total_tat = tat.reduce((a, b) => a + b, 0);
    const avg_wt = total_wt / n;
    const avg_tat = total_tat / n;
    
    // Create result data
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push({
            process_id: processes_copy[i].process_id,
            burst_time: processes_copy[i].burst_time,
            arrival_time: processes_copy[i].arrival_time,
            priority: processes_copy[i].priority,
            waiting_time: wt[i],
            turnaround_time: tat[i],
            completion_time: completion_time[i]
        });
    }
    
    return {
        results,
        avg_waiting_time: avg_wt,
        avg_turnaround_time: avg_tat,
        gantt_data,
        isPreemptive
    };
};

export const roundRobin = (processes, time_quantum) => {
    const n = processes.length;
    
    // Make a copy of processes to preserve input
    const processes_copy = processes.map(process => ({
        ...process,
        arrival_time: process.arrival_time || 0,
        remaining_time: process.burst_time,
        is_completed: false
    }));
    
    // Sort processes based on arrival time initially
    processes_copy.sort((a, b) => {
        if (a.arrival_time !== b.arrival_time) {
            return a.arrival_time - b.arrival_time;
        }
        return a.process_id.localeCompare(b.process_id);
    });
    
    // Initialize arrays for calculations
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const completion_time = new Array(n).fill(0);
    
    // Create Gantt chart data
    const gantt_data = [];
    
    // Initialize time and ready queue
    let current_time = 0;
    let ready_queue = [];
    let completed = 0;
    let process_index = 0; // To track arrival of new processes
    
    // Add first process to ready queue if arrived at time 0
    while (process_index < n && processes_copy[process_index].arrival_time <= current_time) {
        ready_queue.push(process_index);
        process_index++;
    }
    
    // Process until all processes are completed
    while (completed < n) {
        // If ready queue is empty, advance time to next arrival
        if (ready_queue.length === 0) {
            if (process_index < n) {
                current_time = processes_copy[process_index].arrival_time;
                while (process_index < n && processes_copy[process_index].arrival_time <= current_time) {
                    ready_queue.push(process_index);
                    process_index++;
                }
            } else {
                break; // All processes have completed
            }
        }
        
        // Get next process from ready queue
        const current_process_index = ready_queue.shift();
        
        // Process for time quantum or less if remaining time is less
        const start_time = current_time;
        const time_slice = Math.min(time_quantum, processes_copy[current_process_index].remaining_time);
        current_time += time_slice;
        processes_copy[current_process_index].remaining_time -= time_slice;
        
        // Check for new arrivals during this time slice
        while (process_index < n && processes_copy[process_index].arrival_time <= current_time) {
            ready_queue.push(process_index);
            process_index++;
        }
        
        // Add to Gantt chart
        gantt_data.push({
            process_id: processes_copy[current_process_index].process_id,
            start_time: start_time,
            end_time: current_time,
            arrival_time: processes_copy[current_process_index].arrival_time
        });
        
        // If process has completed
        if (processes_copy[current_process_index].remaining_time === 0) {
            processes_copy[current_process_index].is_completed = true;
            completed++;
            
            // Record completion time
            completion_time[current_process_index] = current_time;
            
            // Calculate turnaround time and waiting time
            tat[current_process_index] = completion_time[current_process_index] - processes_copy[current_process_index].arrival_time;
            wt[current_process_index] = tat[current_process_index] - processes_copy[current_process_index].burst_time;
        } else {
            // If process is not completed, add it back to the ready queue
            ready_queue.push(current_process_index);
        }
    }
    
    // Calculate average waiting time and average turnaround time
    const total_wt = wt.reduce((a, b) => a + b, 0);
    const total_tat = tat.reduce((a, b) => a + b, 0);
    const avg_wt = total_wt / n;
    const avg_tat = total_tat / n;
    
    // Create result data
    const results = [];
    for (let i = 0; i < n; i++) {
        results.push({
            process_id: processes_copy[i].process_id,
            burst_time: processes_copy[i].burst_time,
            arrival_time: processes_copy[i].arrival_time,
            waiting_time: wt[i],
            turnaround_time: tat[i],
            completion_time: completion_time[i]
        });
    }
    
    return {
        results,
        avg_waiting_time: avg_wt,
        avg_turnaround_time: avg_tat,
        gantt_data,
        time_quantum
    };
};

export const compareAlgorithms = (processes, time_quantum = 2) => {
    // Ensure we have valid processes to work with
    if (!processes || processes.length === 0) {
        throw new Error("No processes provided for comparison");
    }
    
    // Make sure all algorithms return consistent data structure
    try {
        return {
            fcfs: fcfs(processes),
            sjf: sjf(processes),
            srtf: srtf(processes),
            priority: priorityScheduling(processes, false),
            priority_preemptive: priorityScheduling(processes, true),
            round_robin: roundRobin(processes, time_quantum)
        };
    } catch (error) {
        console.error("Error in compareAlgorithms:", error);
        throw error;
    }
}; 