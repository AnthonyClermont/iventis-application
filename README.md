<div align="center">
  <h3 align="center">Iventis Frontend Interview Assignment</h3>

  <p align="center" style="max-width: 600px">
    Small project as part of the interview process. Providing information about Pokémon and their abilities, as well as effects translated into Yoda language 👽.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#requirements-overview">Requirements Overview</a>
    </li>
    <li>
      <a href="#technical-requirements">Technical Requirements</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
        <a href="#live-application">Live Application</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#run-tests">Run Tests</a>
    </li>
  </ol>
</details>

## Requirements Overview

##### 1. I can see a list of available Pokémon names.
Pokémon are put into a searchable datatable.

##### 2. I can select a Pokémon to view more details about it including its abilities and their effects.
Clicking on a row of the datatable will open the side-drawer containing more information about the selected Pokémon.

##### 3. I can choose between English or Yoda for my languages, and this translates only the effects.
Within the header, the user can select the chosen language using the dropdown.

## Technical Requirements

##### These are public APIs with rate limits. We would like to see that handled in the application.
The application caches the response from the PokeAPI, therefore only needing to make the call once.

The rate limit for the Yoda API is handled. When the request responds with a 429 error, the default English description is used with an error toast explaining to the user what occurred.

##### Appropriate tests should be written.
I found this requirement difficult due to my self-taught understanding and experience with React and Next.js. A lot of the test implementations I needed to learn.

Using Jest, tests have been written for the application.

🚨<strong>Disclaimer</strong>
Because of the way Shadcn (the collection of Ui components) imports the actual jsx code, these such components have not got tests written for them. For example: ```button.tsx``` and ```input.tsx```.

## Built With

[![Next.js][Next.js]][Next-url]
[![React.js][React.js]][React-url]
[![Tailwind CSS][Tailwind.css]][Tailwind-url]
[![Jest][Jest.js]][Jest-url]

## Live Application

[Visit The Live Application](https://iventis-application.vercel.app/)

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AnthonyClermont/iventis-application.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run project
   ```sh
    npm run dev
   ```

## Run Tests
```sh
  npm run test
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind.css]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com
[Jest.js]: https://img.shields.io/badge/Jest-000000?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
