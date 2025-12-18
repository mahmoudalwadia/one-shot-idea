import { useState } from 'react';

export function useClientOnly() {
  const [mounted] = useState(true);

  return mounted;
}
