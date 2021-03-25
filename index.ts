import cluster from 'cluster'

if (cluster.isMaster) {

    // Count the machine's CPUs
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', ({id}) => {
        // Replace the dead worker, we're not sentimental
        console.log(`Worker ${id} died :(`);
        cluster.fork();

    });
} else {
  require('./app')
}
