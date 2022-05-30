import 'firebase/auth';
import 'firebase/firestore';
import { CRUDReturn } from './crud_return.interface';
import { SystemMessage, User } from './user.model';

const admin = require('firebase-admin');
const systemMessage = new SystemMessage();
const users = 'users';

export class DatabaseQuery {
  static async commit(user: User): Promise<CRUDReturn> {
    try {
      var db = admin.firestore();
      await db.collection(users).doc(user.id).set(user.toJsonPass());

      return systemMessage.success(user.toJson());
    } catch (error) {
      return systemMessage.error(error);
    }
  }

  static async delete(id: string): Promise<CRUDReturn> {
    try {
      var db = admin.firestore();
      await db.collection(users).doc(id).delete();

      return systemMessage.success(103);
    } catch (error) {
      return systemMessage.error(error);
    }
  }

  static async hasID(id: string): Promise<boolean | any> {
    try {
      var db = admin.firestore();
      const userRef = db.collection(users).doc(id);
      var doc = await userRef.get();

      return !doc.exists;
    } catch (error) {
      throw systemMessage.error(error);
    }
  }

  static async alreadyExistEmail(
    email: string,
    id?: string,
  ): Promise<boolean | any> {
    try {
      var db = admin.firestore();
      const userRef = db.collection(users);
      const userResults = await userRef
        .where('email', '==', email.toLowerCase())
        .get();
      if (!userResults.empty && id)
        for (const user of userResults.docs) {
          if (user.id == id) return false;
        }

      if (!userResults.empty) return true;
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async replaceValues(id: string, user: User) {
    try {
      var db = admin.firestore();
      await db.collection(users).doc(id).set(user.toJsonPass());

      return systemMessage.success(user.toJson());
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async updateValues(id: string, user: User) {
    try {
      var db = admin.firestore();
      await db.collection(users).doc(id).update(user);

      var newUser = await db.collection(users).doc(id).get();
      return systemMessage.success(newUser.data());
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async getAllUsers() {
    try {
      var db = admin.firestore();
      var userRef = await db.collection(users).get();

      var populatedData = [];
      userRef.forEach((doc) => {
        var user = new User(doc.data());
        populatedData.push(user.toJson());
      });

      return populatedData;
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async getUser(id: string) {
    try {
      var db = admin.firestore();
      var userRef = await db.collection(users).doc(id).get();

      return userRef.data();
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async loginUser(email: string, password: string): Promise<User> {
    try {
      var db = admin.firestore();
      var userRef = await db.collection(users);
      var userResult = await userRef
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      var user: User;
      userResult.forEach((doc) => {
        user = new User(doc.data());
      });

      return user;
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  static async searchInUser(term: string): Promise<any> {
    try {
      var db = admin.firestore();
      var userRef = await db.collection(users).get();
      var populatedData = [];

      userRef.forEach((doc) => {
        var user = new User(doc.data());

        for (var attributename in doc.data()) {
          if (user['id'] == term) {
            populatedData.push(user.toJson());
            break;
          }

          var docData = `${user[attributename]}`.toLowerCase();
          if (
            attributename != 'password' &&
            attributename != 'id' &&
            docData.includes(term.toLowerCase())
          ) {
            populatedData.push(user.toJson());
            break;
          }
        }
      });

      return populatedData;
    } catch (error) {
      console.log(error);
      throw systemMessage.error(error);
    }
  }

  // static async populate(users:Map<string, User>): Promise<CRUDReturn> {
  //   try {
  //     var db = admin.firestore();
  //     await db.collection(users).doc(user.id).set(user.toJsonPass());

  //     return systemMessage.success(user.toJson());
  //   } catch (error) {
  //     return systemMessage.error(error);
  //   }
  // }
}
