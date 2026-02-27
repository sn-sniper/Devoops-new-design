export function InitialLoader() {
  return (
    <div id="loader-bg" className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div id="loader-text" className="font-mono text-sm tracking-widest text-muted opacity-0">
        [SYSTEM INITIALIZING...]
      </div>
    </div>
  );
}
