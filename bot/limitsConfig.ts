// Outgoing Global Throttler
const globalConfig = {
    reservoir: 30, // number of new jobs that throttler will accept at start
    reservoirRefreshAmount: 30, // number of jobs that throttler will accept after refresh
    reservoirRefreshInterval: 1500, // interval in milliseconds where reservoir will refresh
};

// Outgoing Group Throttler
const groupConfig = {
    maxConcurrent: 1, // only 1 job at a time
    minTime: 1000, // wait this many milliseconds to be ready, after a job
    reservoir: 20, // number of new jobs that throttler will accept at start
    reservoirRefreshAmount: 20, // number of jobs that throttler will accept after refresh
    reservoirRefreshInterval: 60000, // interval in milliseconds where reservoir will refresh
};

// Outgoing Private Throttler
const outConfig = {
    maxConcurrent: 1, // only 1 job at a time
    minTime: 1500, // wait this many milliseconds to be ready, after a job
};

export { globalConfig, groupConfig, outConfig };
