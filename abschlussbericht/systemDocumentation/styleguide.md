# Style guide

### commits

-   written in english
-   commits contain the page and component that one works on.
-   written in present tense e.g. "index.vue: creates button component"
-   at least one full sentence.

### coding

-   pages are named with kebab-case
-   components, types are named with Upper CamelCase
-   functions, stores are named with camelCase
-   prettier:
-   tab -> 4 spaces
-   javascript with semicolon
-   es5 trailing comma
-   create interfaces for
-   functions not more than 20 lines
-   pick long and descriptive names for variables, functions etc.
-   create interfaces to ensure descriptive types
-   for each type/interface create one file. this file is stored
    inside ./types in the root director.
-   create tests for each page using cypress

## comments

-   use [jsdoc](https://jsdoc.app/about-getting-started.html) for everything
    besides simple getters.
-   Required tags: @description, @return, @param
-   recommended tags(if the use case fits): @example, @link
-   TODO(nameOfDeveloper): description of task
-   MAYBE(nameOfDeveloper): description of idea or potential feature.

## git workflow

-   feature branch workflow:
-   every feature has his own branch: feature/TILES-nrOftheFeature-featureDescription
-   after peer-review merge to develop branch
-   before review merge develop branch to master

