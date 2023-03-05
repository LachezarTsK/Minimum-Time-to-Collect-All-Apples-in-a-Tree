
#include <queue>
#include <vector>
using namespace std;

class Solution {
    
    vector<vector<int>> graph;
    vector<int> outdegree;
    vector<bool> uniquePathsToApples;

public:
    int minTime(int totalNodes, const vector<vector<int>>& edges, const vector<bool>& hasApple) {
        initializeGraph(edges, totalNodes);
        initializeOutdegree(edges, totalNodes);
        initializeUniquePathsToApples(totalNodes, hasApple);
        breadthFirstSearch_markUniquePathsToApples();
        return countStepsOnUniquePathsToApples_includingReturnJourneys();
    }

private:
    int countStepsOnUniquePathsToApples_includingReturnJourneys() const {
        int count = 0;
        for (const auto& nodeOnPathToApple : uniquePathsToApples) {
            if (nodeOnPathToApple) {
                ++count;
            }
        }
        return 2 * count; //multiply by 2 for the return journey.
    }

    void breadthFirstSearch_markUniquePathsToApples() {
        queue<int> queue;
        initializeQueue(queue);

        while (!queue.empty()) {
            int current = queue.front();
            queue.pop();
            const vector<int>& neighbours = graph[current];
            for (const auto& next : neighbours) {
                if (next != 0) {
                    if (--outdegree[next] >= 1) {
                        uniquePathsToApples[next] = uniquePathsToApples[next] || uniquePathsToApples[current];
                    }
                    if (outdegree[next] == 1) {
                        queue.push(next);
                    }
                }
            }
        }
    }

    void initializeGraph(const vector<vector<int>>& edges, int totalNodes) {
        graph.resize(totalNodes);
        for (const auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]);
            graph[edge[1]].push_back(edge[0]);
        }
    }

    void initializeOutdegree(const vector<vector<int>>& edges, int totalNodes) {
        outdegree.resize(totalNodes);
        for (const auto& edge : edges) {
            ++outdegree[edge[0]];
            ++outdegree[edge[1]];
        }
    }

    void initializeUniquePathsToApples(int totalNodes, const vector<bool>& hasApple) {
        uniquePathsToApples.resize(totalNodes);
        for (int i = 1; i < hasApple.size(); ++i) {
            uniquePathsToApples[i] = hasApple[i];
        }
    }

    void initializeQueue(queue<int>& queue) const {
        for (int i = 1; i < outdegree.size(); ++i) {
            if (outdegree[i] == 1) {
                queue.push(i);
            }
        }
    }
};
