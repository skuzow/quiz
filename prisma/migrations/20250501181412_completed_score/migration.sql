-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTestCompleted" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" REAL NOT NULL DEFAULT 0.00,
    "testId" TEXT NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserTestCompleted_testId_fkey" FOREIGN KEY ("testId") REFERENCES "UserTest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserTestCompleted" ("completedAt", "id", "testId") SELECT "completedAt", "id", "testId" FROM "UserTestCompleted";
DROP TABLE "UserTestCompleted";
ALTER TABLE "new_UserTestCompleted" RENAME TO "UserTestCompleted";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
