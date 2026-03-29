import { useState } from 'react';

export function useOpeningSequence() {
  const [sequenceComplete, setSequenceComplete] = useState(false);
  return { sequenceComplete, setSequenceComplete };
}
