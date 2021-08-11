# Test Instructions 

Please implement as many of the features listed below as you can in the time available. 

Once you are finished, push the branch containing your changes to this repository and 
open a merge request into the `master` branch.

There are four hard requirements:
- Components must be functional, do not use class components
- Do not modify `package.json`
- Do not modify `utils/ThirdParty.js`
- All tests and linting checks must pass

You are otherwise free to make any changes you wish to the code in this `client`
directory.

Please note this also applies to the tests - you are free to make any changes
whatsoever to these tests so long as the 'intention' of the tests remains the
same. As a concrete example, the tests currently assume a `props` object of the
form `{ HighScores: highScores }` will be used by the `Home` component. Should
your implementation not fit this assumption the tests should be amended
appropriately.

It's not expected that you'll complete all the tasks but... If you have fulfilled all the requirements with plenty of time 
remaining then make any changes or improvements you'd like - flesh out the design, make
improvements to the codebase, add more tests... Whatever you'd be happiest
doing. :slightly_smiling_face:

### Note on Endpoints ###
The test project uses Mirage JS to create a mock API and generate responses for get & post requests to `/user-date`, `/high-scores` & `/feedback`

An example of the endpoints in action can be found on `components/utils/Context/User.jsx` on line 12


## User data:

The test app already receives data from the mock API's `/user-data` endpoint which returns a `User` object:
```
{
  userId: int,
  userName: string,
  score: int
}
```

- Ensure the page displays "Hello `userName`"
- Ensure the page displays "Your score is `score`"
  - By default `score` should be coloured brand pink
  - If `score` is divisible by 3 it should be coloured brand teal
  - If `score` is divisible by 5 it should be coloured brand light green


## Scoreboard:

The mocked API has a `/high-scores` endpoint, which returns an array of
objects in the form: 
```
{
  userName: string,
  score: int
}
```

- Implement a get request to the `/high-scores` endpoint
- Use the provided data to create a scoreboard. Each entry should display
the user's: 
  - position on the scoreboard
  - name
  - score
- The scoreboard should be styled so that alternating entries have a different
background colour
- If the user is on the scoreboard their entry should use brand yellow as the
background colour

## Feedback Form: 

- Create a form to handle feedback submission
- Ensure the form contains a `textarea` with the `placeholder` attribute set
  to "Feedback".
- Ensure the form cannot be submitted if the `textarea` is empty
- The contents of the `textarea` should be posted to the `/feedback` endpoint;

## UI:
 
 - Flexbox should be used for page layout
 - The Feedback Form can be toggled to show or hide with a slide effect

## Analytics:

Functions that mock an analytics platform can be found in the
`utils/ThirdParty.js` component.

- Initialise the analytics in the `AppHead` component
- Call the analytics `page()` function when a user views the app's home and
login pages
- Call the analytics' `trackUser()` function with `User.userId` when
`User.userId` is defined
- Call the analytics `trackEvent()` function when a user submits feedback.
The `name` argument should be "Submit feedback", and the `details` argument
should be the data passed to the API by the feedback form
