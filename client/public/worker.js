let intervalId;

self.onmessage = function (e) {
    const { fnString, args, action } = e.data;

    if (action === 'start') {
        const fn = new Function('return ' + fnString)();

        intervalId = setInterval(() => {
            const result = fn(...args);

            // Check if the result is a promise
            if (result instanceof Promise) {
                result
                    .then(resolvedValue => {
                        self.postMessage({ id: e.data.id, result: resolvedValue });
                    })
                    .catch(error => {
                        // Optionally handle the error or send a message back about the error
                        console.error("Error in worker:", error);
                        self.postMessage({ id: e.data.id, error: error.toString() });
                    });
            } else {
                self.postMessage({ id: e.data.id, result });
            }

        }, 5000);  // Runs every 5 seconds
    }

    if (action === 'stop' && intervalId) {
        clearInterval(intervalId);
    }
};