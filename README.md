# Project Title: Real-time Chat Application

### To use the application, head to samyarsworld.github.io and play around with our cool algorithms!


## Index
1. [About](#about)
2. [Demo](#demo)
3. [Technologies](#tech)
4. [Usage and Installation](#installation)
5. [In the Website](#usage)
6. [Developer Features](#dev)
7. [Future Improvements](#future)
8. [Credits](#credits) 
9. [License](#license)
 

<a name="about"></a>
## About
This project features three different algorithm visualizers. You can explore pathfinding, minimum spanning trees, and topological sorting algorithms. These visualizers allow you to see these algorithms in action and gain a better understanding of their functionality.


<a name="demo"></a>
## Demo

| Pathfinder Algorithm View  |
|:----------------------|
|<img src="https://drive.google.com/uc?export=view&id=1XZNd67sRb4dImM7JX-MbB204fM-9a9MA" width="100%" height="100%"/> |

| Pathfinder Algorithm With Maze View  |
|:----------------------|
|<img src="https://drive.google.com/uc?export=view&id=1VYOlgPsyS6kzt2LbhmIRVt_KAROtvQMx" width="100%" height="100%"/> |

| Minimum Spanning Trees Algorithm View |
|:----------------------|
<img src="https://drive.google.com/uc?export=view&id=1jjK6AiyUp0kaskmtLOJqyyJ6FloGxBtj" width="100%" height="100%"/> |

| Topological Sort Algorithm View |
|:----------------------|
<img src="https://drive.google.com/uc?export=view&id=1OseG-5FP1bXipds042iEfaHkGPmyulb9" width="100%" height="100%"/> |



<a name="tech"></a>
## Technologies
- Javascript
- HTML
- css
- Bootstrap
- Font-awesome
- Toast
- Vis.js


<a name="installation"></a>
## Usage and Installation
To use the application, head to samyarsworld.github.io . To use it locally, follow the next section.

To install the pathfinding website on your local computer, you need to:

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/samyarsworld/samyarsworld.github.io
   ```

2. Navigate to the project directory.

   ```
   cd algo_visualizers
   ```

3. Simply run live on your IDE or open index.html located in root of the project in your favourite browser.



<a name="usage"></a>
## In the Website
In this algorithm visualizer website you can explore and interact with different algorithm visualizers. There a variety of tools that allow you to understand and see algorithms in action.

On the first tab you can find visualizers that visualize various well-known pathfinding algorithms, which is shown in a grid space where you can see the journey from a start node to a finish node. There are various algoirthms that you can choose from including, DFS, BFS, Dijkstra (UCS), A* (Manhattan Distance), Greedy Best-first, Bidirectional Dijkstra, and Bidirectional A*. Some of these algorithms are used to find the shortest path between two points or the fastest way to find a path, and they commonly used in GPS systems, gaming, and robotics. Additionally, you can add walls to simulate dead-end roads or add weights that describe how much traffic is in some directions. After finding a path, you will get prompted and the found path is shown.

On the second tab, Minimum Spanning Tree (MST) visualizer is presented. MST is a subset of the edges of a connected, edge-weighted undirected graph. The MST connects all the vertices together without any cycles and with the minimum possible total edge weight. This algorithm has various applications in network design, clustering, and image segmentation. Simply click on the screen and the algorithm find the best possible way to connect the new dot to the cluster.

Lastly, a topological sorting algorithm visualizer is shown in the third tab, which creates a linear ordering of vertices in a directed graph. This algorithm is commonly used in scheduling, task management, and job sequencing. Add you tasks in the inputs, add their prerequisites. You can add upto 5 tasks at the moment. Visulize and see how you tasks are connected.


<a name="dev"></a>
## Developer Features

**UI Design with HTML, CSS, and Bootstrap**: The website's UI is built using HTML, CSS, and the Bootstrap library, providing a user-friendly interface.

**Dynamic User Experience with Javascript**: Javascript is used to create a dynamic user experience by manipulating the DOM and HTML.

**Toast Notifications with Toast Library**: The Toast library is used to provide dynamic prompts on the screen, improving the user experience.

**Pathfinding Algorithm with Node Classes**: The pathfinding algorithm's interface is created using Node classes, allowing for dynamic changes to each grid's state.

**Object-Based Design for Pathfinding Algorithms**: Various pathfinding algorithms are coded using Javascript and connected to the frontend grid using an object-based design.


<a name="future"></a>
## Future Improvements

**Expand Algorithm Visualization**: The website's goal is to provide an immersive and interactive experience with various algorithm visualizations. The aim is to expand the selection of visualizations, including sorting algorithms and Sudoku visualizers that use backtracking. 

By adding new algorithm visualizations, the website hopes to provide a broader range of educational resources for users, making it a valuable tool for students, developers, and anyone interested in learning about algorithms. Keep an eye out for updates as the website continues to grow and expand its selection of algorithm visualizations.

## Credits

- SAMYAR FARJAM (https://github.com/samyarsworld)

If you'd like to contribute to algo_visualizers, please feel free to submit a pull request or open an issue on our [GitHub repository](https://github.com/samyarsworld/samyarsworld.github.io). We welcome all contributions and feedback.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.
