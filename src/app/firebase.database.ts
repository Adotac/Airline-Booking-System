import 'firebase/auth';
import 'firebase/firestore';

const admin = require('firebase-admin');
const users = 'users';

export class DatabaseQuery {
  static async commitFlight(user: any) {
    try {
      // var db = admin.firestore();
      // await db.collection('flights').doc(user.id).set(user);
      console.log(user.id);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}
