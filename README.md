[![Gitter](https://badges.gitter.im/BioDataAnalysis/benchviz.svg)](https://gitter.im/BioDataAnalysis/benchviz?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# BenchViz

BenchViz aims to easily visualize benchmark results from [Google Benchmark](https://github.com/google/benchmark).

# Technology

We have rough roadmap of how we plan to implement this project, but of course, any suggestion is well accepted and appreciated!

## Backend

For a start, we need to have a backend that can handle benchmark file submission via an endpoint like `/api/v1/submission`, and login endpoint, like `/api/v1/login`.

We decided to go for [NodeJS](https://github.com/nodejs/node) as the backend, mainly because we are already familiar with some general aspects of the development.

Following, the web interface which actually allows the user to do stuff, like login and data visualization, will be handled via a React application. Again, we decided to go for something that we were familiar with.

# License

Apache 2.0 License

# Authors & Contributors

- [Mario Emmenlauer](https://github.com/memmenlau)
- [Adrian Castro](https://github.com/IAL32)
