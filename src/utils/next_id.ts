const getNextId = (existingIds: number[]): number => {
  if (existingIds.length === 0) {
    return 1;
  }
  const maxId = Math.max(0, ...existingIds);
  for (let i = 1; i <= maxId + 1; i++) {
    if (!existingIds.includes(i)) {
      return i;
    }
  }
  return maxId + 1;
};
