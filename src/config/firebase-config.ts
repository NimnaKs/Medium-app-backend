import * as admin from 'firebase-admin';
import * as path from "path";

const serviceAccount = require(path.resolve(
  __dirname,
  "../credentials/eventify-5fc9b-firebase-adminsdk-taxb8-eb26b159aa.json"
));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://eventify-5fc9b.appspot.com"
});

const bucket = admin.storage().bucket();

export { admin, bucket };