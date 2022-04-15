# Assignment 06 -> Performance (due Date: 19.4. 6AM):

- Split your bundle into various chunks
- - each route should get its own chunk
- - Use react lazy and Suspense
- Find and fix at least 6 performance related issues in your code

## While doing this assignment: i met new friend in my room: https://youtu.be/BHsWXSk7nL0?t=84
## 6 performance related issues fixed:
- Switch from Development build to Production Build -> in the production build warnings are stripped
    with CRA 6 run npm run build

- "Memoizing" functions -> makes it faster by trading space for time. It does this by caching the return values of the function in a table.
- use lazy load