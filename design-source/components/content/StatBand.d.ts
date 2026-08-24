import * as React from 'react';

/**
 * The dark counter block: a gold number that counts up when it scrolls into view,
 * a handwritten caption under it, and supporting copy on the right.
 *
 * @startingPoint section="Content" subtitle="Dark band with a counting gold number" viewport="700x360"
 */
export interface StatBandProps {
  /** The real total. Never ship an invented figure — flag it if the client has not supplied one. */
  value?: number;
  /** Handwritten line under the number: "zaparzonych kaw". */
  caption?: string;
  /** Copy on the right, ending in a colon because the number completes the sentence. */
  body?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export function StatBand(props: StatBandProps): React.JSX.Element;
