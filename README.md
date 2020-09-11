[![Gitter](https://badges.gitter.im/BioDataAnalysis/benchviz.svg)](https://gitter.im/BioDataAnalysis/benchviz?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# BenchViz

BenchViz is a minimalistic framework to collect and visualize benchmark results. It is implemented with a focus on [Google Benchmark](https://github.com/google/benchmark) but should support other types of benchmarks, as long as the data format is JSON.

# Technology

The roadmap for the technology stack is not set in stone, suggestions are well appreciated!

## Backend

Requirements for the backend:
 - As lightweight as possible, while ensuring that it
 - Can store benchmark results in a way suitable for fast querying, and
 - Can provide benchmark meta data and results to the web frontend, and
 - Allows for user authentication and access control.

The backend implemets a data store endpoint like `/api/v1/submission`, and login endpoint, like `/api/v1/login`.

To allow aggregation of benchmark meta data, we will use an SQL database to aggregate the results. Our choice of lightweight database is [SQLite](https://www.sqlite.org/index.html), but in the future, other types may be supported too. We integrate SQLite via an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping).

Our choice for the backend is [NodeJS](https://github.com/nodejs/node) for its easy setup (no dedicated webserver required) and easy integration of an SQLite ORM.

The web frontend should handle all visualization and interactivity. It needs to feature a login, and various ways to browse and chart the data. To stay within the Javascript world, the application will be built as a React application that uses [D3.js](https://d3js.org/) for interactive charting and plotting.

# License

This code is free and open source software, distributed under the terms of the Apache 2.0 License. If you have questions about licensing, please get in touch.

# Authors, Contributors and Sponsors

- [Mario Emmenlauer](https://github.com/memmenlau)
- [Adrian Castro](https://github.com/IAL32)
- [BioDataAnalysis GmbH](https://www.biodataanalysis.de/)