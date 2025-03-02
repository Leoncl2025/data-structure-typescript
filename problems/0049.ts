function groupAnagrams(strs: string[]): string[][] {  
    const map = new Map<string, string[]>();
    for (const str of strs) {
      const key = createKey(str);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(str);
    }

    return Array.from(map.values());
};

function createKey(str: string): string {
  return str.split('').sort().join('');
}