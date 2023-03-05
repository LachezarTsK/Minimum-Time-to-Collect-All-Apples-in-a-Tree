
/**
 * @param {number} totalNodes
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function (totalNodes, edges, hasApple) {
    this.graph = Array.from(new Array(totalNodes), () => []);
    this.outdegree = new Array(totalNodes).fill(0);
    this.uniquePathsToApples = new Array(totalNodes).fill(false);

    initializeGraph(edges);
    initializeOutdegree(edges);
    initializeUniquePathsToApples(hasApple);
    breadthFirstSearch_markUniquePathsToApples();
    return countStepsOnUniquePathsToApples_includingReturnJourneys();
};

/**
 * @return {number}
 */
function countStepsOnUniquePathsToApples_includingReturnJourneys() {
    let count = 0;
    for (let nodeOnPathToApple of this.uniquePathsToApples) {
        if (nodeOnPathToApple) {
            ++count;
        }
    }
    return 2 * count;//multiply by 2 for the return journey.
}

/**
 * @return {void}
 */
function breadthFirstSearch_markUniquePathsToApples() {
    //const {Queue} = require('@datastructures-js/queue');
    const queue = new Queue();
    initializeQueue(queue);

    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        const neighbours = this.graph[current];
        for (let next of neighbours) {
            if (next !== 0) {
                if (--this.outdegree[next] >= 1) {
                    this.uniquePathsToApples[next] = this.uniquePathsToApples[next] || this.uniquePathsToApples[current];
                }
                if (outdegree[next] === 1) {
                    queue.enqueue(next);
                }
            }
        }
    }
}

/**
 * @param {number[][]} edges
 * @return {void}
 */
function initializeGraph(edges) {
    for (let edge of edges) {
        this.graph[edge[0]].push(edge[1]);
        this.graph[edge[1]].push(edge[0]);
    }
}

/**
 * @param {number[][]} edges
 * @return {void}
 */
function initializeOutdegree(edges) {
    for (let edge of edges) {
        ++this.outdegree[edge[0]];
        ++this.outdegree[edge[1]];
    }
}

/**
 * @param {boolean[]} hasApple
 * @return {void}
 */
function initializeUniquePathsToApples(hasApple) {
    for (let i = 1; i < hasApple.length; ++i) {
        this.uniquePathsToApples[i] = hasApple[i];
    }
}

/**
 * @param {Queue<number>} queue
 * @return {void}
 */
function initializeQueue(queue) {
    for (let i = 1; i < this.outdegree.length; ++i) {
        if (this.outdegree[i] === 1) {
            queue.enqueue(i);
        }
    }
}
