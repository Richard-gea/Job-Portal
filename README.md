# Job Portal

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Create a production build:

   ```bash
   npm run build
   ```

4. Run tests:

   ```bash
   npm test -- --watchAll=false
   ```

## Notes

- The app uses Firebase/Firestore from `src/firebaseConfig.js`, so make sure that project is reachable from your machine when testing data-dependent flows.
- The main UI uses Bootstrap utility classes and Remix Icon styles loaded from CDNs in `public/index.html`.
