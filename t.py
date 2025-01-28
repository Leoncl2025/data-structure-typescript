from collections import Counter

class Solution:
    def MultiPickMatch(self, s1: str, s2:str, s1word="a", s2word="a") -> bool:
        if len(s1) <= 1:
            if s1 != s2:
                return False
            if len(s1word) <= 1:
                return s1word == s2word
        elif (s1word, s2word) in ProcessDict and (s1, s2) in ProcessDict and ProcessDict[(s1, s2)] and ProcessDict[(s1word, s2word)]:
            return True
        # elif (s1word, s2word) in ProcessDict and ProcessDict[(s1word, s2word)]:
        #     return True
        # elif (s1word, s2word) in ProcessDict and not ProcessDict[(s1word, s2word)]:
        #     return False
                    
        elif self.MultiPickMatch(s1word, s2word): 
            ProcessDict[(s1word, s2word)] = True
            ProcessDict[(s2word, s1word)] = True      
        
            if s1 == s2:
                return True

            for i in range(1, len(s1)):
                s1First = s1[:i]
                s1RemoveFirst = s1[i:]
                s1Last = s1[-i:]
                s1RemoveLast = s1[:-i]
                s2First = s2[:i]
                s2RemoveFirst = s2[i:]
                s2Last = s2[-i:]
                s2RemoveLast = s2[:-i]

                if Counter(s1Last) == Counter(s2Last):
                    c1 = self.MultiPickMatch(s1RemoveLast, s2RemoveLast, s1Last, s2Last)
                    if c1:
                        return True
                else:
                    ProcessDict[(s1Last, s2Last)] = False
                    ProcessDict[(s2Last, s1Last)] = False
                if Counter(s1Last) == Counter(s2First):
                    c2 = self.MultiPickMatch(s1RemoveLast, s2RemoveFirst, s1Last, s2First)
                    if c2:
                        return True
                else:
                    ProcessDict[(s1Last, s2First)] = False
                    ProcessDict[(s2First, s1Last)] = False
                if Counter(s1First) == Counter(s2First):
                    c3 = self.MultiPickMatch(s1RemoveFirst, s2RemoveFirst, s1First, s2First)
                    if c3:
                        return True
                else:
                    ProcessDict[(s1First, s2First)] = False
                    ProcessDict[(s2First, s1First)] = False
                if Counter(s1First) == Counter(s2Last):
                    c4 = self.MultiPickMatch(s1RemoveFirst, s2RemoveLast, s1First, s2Last)
                    if c4:
                        return True
                else:
                    ProcessDict[(s1First, s2Last)] = False
                    ProcessDict[(s2Last, s1First)] = False
        else:
            
            ProcessDict[(s1, s2)] = False
            ProcessDict[(s2, s1)] = False
            return False
        
        return False

    def isScramble(self, s1: str, s2: str) -> bool:
        global ProcessDict
        ProcessDict = {}
        return self.MultiPickMatch(s1, s2)
    
if __name__ == "__main__":
    s = Solution()
    print(s.isScramble("bccbccaaabab", "ccababcaabcb"))