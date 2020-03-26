import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('GrocerEats.db');

export const init_saved_recipes_db = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS GrocerEats (mealId INTEGER PRIMARY KEY NOT NULL, mealDetails TEXT NOT NULL);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err);
        }
      );
    })
  })
  return promise;
}

export const insertSavedRecipe = (mealId, mealDetails) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO GrocerEats (mealId, mealDetails) VALUES (?, ?);`,
        [mealId, mealDetails],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const deleteSavedRecipe = (mealId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM GrocerEats WHERE mealId = ?;`,
        [mealId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const fetchSavedRecipes = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM GrocerEats',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

