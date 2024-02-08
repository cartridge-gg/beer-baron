const WORKER_POOL_SIZE = 20;
const workerPool = Array.from({ length: WORKER_POOL_SIZE }, () => new Worker('./worker.js'));

type Task = {
    id: number;
    fnString: string;
    args: any[];
    action: 'start' | 'stop';
    worker?: Worker;
};

const taskQueue: Task[] = [];
const callbacks: { [key: number]: (result: any) => void } = {};
let taskId = 0;

workerPool.forEach((worker) => {
    worker.onmessage = (e) => {
        const { id, result } = e.data;

        const callback = callbacks[id];
        if (callback) {
            callback(result);
            delete callbacks[id]; // Cleanup callback once done

            const taskIndex = taskQueue.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                taskQueue.splice(taskIndex, 1);
            }
        }

        if (taskQueue.length > 0) {
            const nextTask = taskQueue.shift();
            if (nextTask) {
                worker.postMessage(nextTask);
            }
        }
    };
});

function startTask(fn: Function, args: any[], callback: (result: any) => void): number {
    const task: Task = {
        id: taskId++,
        fnString: fn.toString(),
        args,
        action: 'start',
    };

    // Store callback by taskId
    callbacks[task.id] = callback;

    const freeWorker = workerPool.find((worker) => !taskQueue.find((task) => task.worker === worker));

    if (freeWorker) {
        freeWorker.postMessage(task);
        task.worker = freeWorker;
    } else {
        taskQueue.push(task);
    }

    return task.id;
}

function stopTask(id: number): void {
    const task = taskQueue.find((t) => t.id === id);
    if (task && task.worker) {
        task.worker.postMessage({ action: 'stop' });
    }
}

export { startTask, stopTask };
