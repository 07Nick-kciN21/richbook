import { dbPromise } from "./db";

export const changeAllRecordType2Id = async () => {
  const db = await dbPromise;

  // Get all records and type entries
  const allRecords = await db.getAll("recordClusters");
  const allTypes = await db.getAll("typeClusters");

  // Create a map of type name to type ID
  const typeMap = new Map<string, string>(
    allTypes.map((type) => [type.name, type.id])
  );

  // Iterate through all records and update the type field
  for (const record of allRecords) {
    const typeId = typeMap.get(record.type);

    if (typeId !== undefined) {
      // Update the record's type to the corresponding type ID
      const updatedRecord = {
        ...record,
        type: typeId,
      };

      // Save the updated record back to the database
      await db.put("recordClusters", updatedRecord);
    } else {
      console.warn(`Type ${record.type} not found in typeClusters.`);
    }
  }

  console.log(
    "All records' type fields have been updated to their corresponding type IDs."
  );
};
