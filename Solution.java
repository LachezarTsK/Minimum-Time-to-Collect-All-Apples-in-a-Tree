
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {

    List<Integer>[] graph;
    int[] outdegree;
    boolean[] uniquePathsToApples;

    public int minTime(int totalNodes, int[][] edges, List<Boolean> hasApple) {
        initializeGraph(edges, totalNodes);
        initializeOutdegree(edges, totalNodes);
        initializeUniquePathsToApples(totalNodes, hasApple);
        breadthFirstSearch_markUniquePathsToApples();
        return countStepsOnUniquePathsToApples_includingReturnJourneys();
    }

    private int countStepsOnUniquePathsToApples_includingReturnJourneys() {
        int count = 0;
        for (boolean nodeOnPathToApple : uniquePathsToApples) {
            if (nodeOnPathToApple) {
                ++count;
            }
        }
        return 2 * count;//multiply by 2 for the return journey.
    }

    private void breadthFirstSearch_markUniquePathsToApples() {
        Queue<Integer> queue = new LinkedList<>();
        initializeQueue(queue);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            List<Integer> neighbours = graph[current];
            for (int next : neighbours) {
                if (next != 0) {
                    if (--outdegree[next] >= 1) {
                        uniquePathsToApples[next] = uniquePathsToApples[next] || uniquePathsToApples[current];
                    }
                    if (outdegree[next] == 1) {
                        queue.add(next);
                    }
                }
            }
        }
    }

    private void initializeGraph(int[][] edges, int totalNodes) {
        graph = new ArrayList[totalNodes];
        for (int i = 0; i < totalNodes; ++i) {
            graph[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            graph[edge[1]].add(edge[0]);
        }
    }

    private void initializeOutdegree(int[][] edges, int totalNodes) {
        outdegree = new int[totalNodes];
        for (int[] edge : edges) {
            ++outdegree[edge[0]];
            ++outdegree[edge[1]];
        }
    }

    private void initializeUniquePathsToApples(int totalNodes, List<Boolean> hasApple) {
        uniquePathsToApples = new boolean[totalNodes];
        for (int i = 1; i < hasApple.size(); ++i) {
            uniquePathsToApples[i] = hasApple.get(i);
        }
    }

    private void initializeQueue(Queue<Integer> queue) {
        for (int i = 1; i < outdegree.length; ++i) {
            if (outdegree[i] == 1) {
                queue.add(i);
            }
        }
    }
}
