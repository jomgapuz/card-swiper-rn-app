import * as React from 'react';

export default function EnsureRender({
  children: Children,
}: {
  children: React.FC;
}) {
  const renderCountRef = React.useRef(0);

  renderCountRef.current += 1;

  return (
    <>
      {renderCountRef.current % 2 ? <Children /> : null}
      {renderCountRef.current % 2 ? null : <Children />}
    </>
  );
}
